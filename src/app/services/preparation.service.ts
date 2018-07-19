import { Categorie } from './../models/categorie.model';
import { RecipeService } from './recipe.service';
import { DialogOkComponent } from './../components/dialog-ok/dialog-ok.component';
import { Router } from '@angular/router';
import { RecipeIngredient } from './../models/recipe-ingredient.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Meal } from './../models/meal.model';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { MatDialog } from '../../../node_modules/@angular/material';
import { Location } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class PreparationService {

  private _preparation: Recipe;
  private _preparationType: string;



  public get preparation(): Recipe {
      return this._preparation;
  }

  public get preparationType(): string {
    return this._preparationType;
}


  public set preparation(preparation: Recipe) {
    this._preparation = preparation;
  }

  // récupère un tableau d'ingrédients a partir du tableau de recipeIngredient de la preparation
  public get ingredientsList(): Ingredient[] {
    const ingredientsList = new Array<Ingredient>();
    if (this.preparation != null) {
      if (this.preparation.listOfIngredients !=  null) {
          this.preparation.listOfIngredients.forEach(recipeIngredient => {
            ingredientsList.push(recipeIngredient.ingredient);
          });
      }
    }
    return ingredientsList;
  }

  // met a jour le tableau de recipeIngredient de la preparation a partir du tableau d'ingredients fourni en paramètre
  // si l'ingredient existe déja ne fait rien, si il n'existe pas alors on l'ajoute avec une quantité a 100 (grs)
  // on retire tous les ingrédients qui ne sont plus dans le tableau fourni
  public set ingredientsList(ingredientList: Ingredient[] ) {
    console.log('PreparationService set ingredientsList : liste recue ', ingredientList);
    if (this.preparation != null) {
      const listRecipeIngredient: RecipeIngredient[] = new Array<RecipeIngredient>();
      ingredientList.forEach(ingredientToAdd => {
        let recipeIngredientFound: RecipeIngredient = null;
        if (this.preparation.listOfIngredients !=  null) {
          recipeIngredientFound = this.preparation.listOfIngredients.find(obj => {
            return obj.ingredient === ingredientToAdd;
          });
        }
        if (recipeIngredientFound != null) {
          listRecipeIngredient.push(recipeIngredientFound);
        } else {
          const recipeIngredientNew = new RecipeIngredient();
          recipeIngredientNew.ingredient = ingredientToAdd;
          recipeIngredientNew.quantity = 100; // 100 grs quantité par défaut
          // recipeIngredientNew.recipe = this.preparation;
          listRecipeIngredient.push(recipeIngredientNew);
        }
      });
      console.log('PreparationService set ingredientsList : liste emise ', listRecipeIngredient);
      this.preparation.listOfIngredients = listRecipeIngredient;
    }
  }

  // CONSTRUCTEUR
  constructor(private router: Router,
              private dialog: MatDialog,
              private recipeService: RecipeService,
              private location: Location
            ) {
    this._preparation = null;
    this._preparationType = '';
  }

  // initialise une nouvelle préparation et navigue sur l'écran de choix des ingrédients
  public doNewPreparation() {
    // on demande une préparation avec ID = 0 (id pour nouvelle préparation)
    this.setPreparationById(0);
  }

  // initialise une nouvelle préparation (sans navigation)
  public setNewPreparation() {
    this.preparation = new Meal();
    this.preparation.id = 0;
    this._preparationType = 'NEW PREPARATION';
    this.preparation.name = 'Nouvelle préparation';
  }

  public setPreparationById(id: number) {
    if (this.preparation === null) {
      //  si il n'y a pas de preparation en cours
      if (id === 0) {
        // Si l'id demandé est 0 alors on initialise une nouvelle préparation et on affiche l'écran de choix d'ingrédients
        this.setNewPreparation();
        this.router.navigateByUrl('/food');
      } else {
        // si l'id demandé est différent de zero alors on recherche la recette ou le repas correspondant.
        this.recipeService.getById(id).subscribe(
          (recipe) => {
            this.preparation = recipe;
            this._preparationType = 'RECIPE';
            console.log('setPreparationById : retour de recipeService.getById(id=' + id + ')', recipe);
          },
          (error: any) => {
            console.log('setPreparationById : retour de recipeService.getById(id=' + id + ') en erreur :', error );
            this.preparation = null;
            if (error.status === 404) {
                const dialogRef = this.dialog.open(
                  DialogOkComponent,
                  {data: {title: 'Erreur', message: 'La recette ' + id + ' n\'existe pas !'}}
                );
                dialogRef.afterClosed().subscribe(result => { this.location.back(); } );
            } else {
              const dialogRef = this.dialog.open(
                DialogOkComponent,
                {data: {title: 'Erreur', message: 'Une erreur est survenue lors de la recherche de la recette'}}
              );
              dialogRef.afterClosed().subscribe(result => { this.location.back(); } );
            }
          }
         );
      }
    } else {
      // si une préparation ou recette est déja en cours
      if (this.preparation.id !== id) {
        // si l'id demandé est différent de l'id déja en cours
        const dialogRef = this.dialog.open(
          DialogOkComponent,
          {data: {title: 'Erreur', message: 'Erreur : ' + this.preparation.name + ' est déja en cours d\'édition !'}}
        );
        dialogRef.afterClosed().subscribe(result => {});
      } else {
        // si l'id demandé est le même que celui de la préparation en cours d'édition
        // on fait rien de spécial
      }
    }
  }

  public razPreparation() {
    // abandonne la préparation en cours
    this._preparation = null;
    this._preparationType = '';
  }


  public savePreparationAsRecipe(recipeName: string, recipeComment: string, category: Categorie) {
    this.preparation.name = recipeName;
    this.preparation.comment = recipeComment;
    this.preparation.category = category;
    console.log('savePreparationAsRecipe : preparation avant envoi : ', this.preparation);
    // call back end to create recipe from this preparatio
    this.recipeService.create(this.preparation).subscribe(
      (recipe) => {
        console.log('retour back apres create recipe', recipe);
        if (recipe && recipe.id) {
          // si en retour du back on a bien recu une nouvelle recette avec son id
          // navigue pour afficher la nouvelle recette
          this.router.navigateByUrl('/preparation/' + recipe.id);
        } else {
          const dialogRef = this.dialog.open(
            DialogOkComponent,
            {data: {title: 'Erreur', message: 'Une erreur est survenue lors de la sauvegarde de la recette !'}}
          );
        }
      },
      (error) => {
        console.log('retour back apres create recipe : error', error);
        const dialogRef = this.dialog.open(
          DialogOkComponent,
          {data: {title: 'Erreur', message: 'Une erreur est survenue lors de la sauvegarde de la recette !'}}
        );
      }
   );
  }
}

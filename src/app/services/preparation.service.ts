import { RecipeService } from './recipe.service';
import { DialogOkComponent } from './../components/dialog-ok/dialog-ok.component';
import { Router } from '@angular/router';
import { RecipeIngredient } from './../models/recipe-ingredient.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Meal } from './../models/meal.model';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { MatDialog } from '../../../node_modules/@angular/material';




@Injectable({
  providedIn: 'root'
})
export class PreparationService {

  private _preparation: Recipe;



  public get preparation(): Recipe {
      return this._preparation;
  }

  public set preparation(preparation: Recipe) {
    this._preparation = preparation;
  }

  // récupère un tableau d'ingrédients a partir du tableau de recipeIngredient de la preparation
  public get ingredientsList(): Ingredient[] {
    const ingredientsList = new Array<Ingredient>();
    if (this.preparation != null) {
      if (this.preparation.listIngredient !=  null) {
          this.preparation.listIngredient.forEach(recipeIngredient => {
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
    if (this.preparation != null) {
      const listRecipeIngredient: RecipeIngredient[] = new Array<RecipeIngredient>();
      ingredientList.forEach(ingredientToAdd => {
        let recipeIngredientFound: RecipeIngredient = null;
        if (this.preparation.listIngredient !=  null) {
          recipeIngredientFound = this.preparation.listIngredient.find(obj => {
            return obj.ingredient === ingredientToAdd;
          });
        }
        if (recipeIngredientFound != null) {
          listRecipeIngredient.push(recipeIngredientFound);
        } else {
          const recipeIngredientNew = new RecipeIngredient();
          recipeIngredientNew.ingredient = ingredientToAdd;
          recipeIngredientNew.quantity = 100; // 100 grs quantité par défaut
          recipeIngredientNew.recipe = this.preparation;
          listRecipeIngredient.push(recipeIngredientNew);
        }
      });
      this.preparation.listIngredient = listRecipeIngredient;
    }
  }

  // CONSTRUCTEUR
  constructor(private router: Router, private dialog: MatDialog, private recipeService: RecipeService ) {
    this.preparation = null;
  }

  // initialise une nouvelle préparation et navigue sur l'écran de choix des ingrédients
  public doNewPreparation() {
    if (this.preparation === null) {
      //  si il n'y a pas de preparation en cours on initialise une nouvelle préparation
      this.setNewPreparation();
      this.router.navigateByUrl('/food');
    } else {
      //  si il n'y a déja une préparation en cours alors message d'erreur
      const dialogRef = this.dialog.open(DialogOkComponent,
        {data: {title: 'Erreur', message: 'Erreur : ' + this.preparation.name + ' est déja en cours d\'édition !'}});
      dialogRef.afterClosed().subscribe(result => {});
    }
  }

  // initialise une nouvelle préparation (sans navigation)
  public setNewPreparation() {
    this.preparation = new Meal();
    this.preparation.id = 0;
    this.preparation.name = 'Nouvelle préparation';
  }

  public setPreparationById(id: number) {
    if (this.preparation != null) {
       //  si il n'y a déja une préparation en cours alors message d'erreur
       console.log('Preparation service set preparationbyid prep != null id=' + id, this.preparation);
       const dialogRef = this.dialog.open(DialogOkComponent,
        {data: {title: 'Erreur', message: 'Erreur : ' + this.preparation.name + ' est déja en cours d\'édition !'}});
      dialogRef.afterClosed().subscribe(result => {});
    } else {
     //  si il n'y a pas de preparation en cours on initialise une nouvelle préparation en recherchant la recette
     this.preparation = this.recipeService.getById(id);
     console.log('Preparation service set preparationbyid prep = null id=' + id, this.preparation);
    }
  }

  public razPreparation() {
    this.preparation = null;
  }

}

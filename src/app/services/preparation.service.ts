import { CategoryService } from './category.service';
import { Recipe } from './../models/recipe.model';
import { Observable, Observer, Subject, observable } from 'rxjs';
import { Categorie } from './../models/categorie.model';
import { RecipeService } from './recipe.service';
import { DialogOkComponent } from './../components/dialog-ok/dialog-ok.component';
import { Router } from '@angular/router';
import { RecipeIngredient } from './../models/recipe-ingredient.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Meal } from './../models/meal.model';
import { Injectable } from '@angular/core';
import { MatDialog } from '../../../node_modules/@angular/material';
import { Location } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class PreparationService {

  private static statut = new Subject<string>();

  // internals variables
  private static _preparation: Meal = null;

  public get preparation(): Meal {
    console.log('PreparationService : get preparation : ', PreparationService._preparation);
    return PreparationService._preparation;
  }

  public set preparation(value: Meal) {
    PreparationService._preparation = value;
    console.log('PreparationService : set preparation : ', PreparationService._preparation);
  }

  private static _preparationType = '';

  public get preparationType() {
    return PreparationService._preparationType;
  }

  public set preparationType(value: string) {
    PreparationService._preparationType = value;
  }

  public getStatut(): Observable<string> {
    return PreparationService.statut;
  }

  public setStatut(statut: string) {
    PreparationService.statut.next(statut);
  }

  // CONSTRUCTEUR
  constructor(private router: Router,
              private dialog: MatDialog,
              private recipeService: RecipeService,
              private location: Location,
              private categoryService: CategoryService
            ) {
              console.log('preparation service Constructor Called !');
  }


  //
  // Reset preparation to null
  //
  public razPreparation() {
    console.log('preparation service RAZ Called !');
    // remet a zero la preparation en cours
    this.preparation = null;
    this.preparationType = '';
  }





  // initialize a new preparation
  public doNewPreparation() {
    // on demande une préparation avec ID = 0 (id pour nouvelle préparation)
    this.findPreparationById(0);
  }



  public findPreparationById(id: number): Observable<string> {
    console.log('Preparation Service : findPreparationById : Enter : id =', id, 'current preparation = ', this.preparation);
    if (this.preparation === null) {
      console.log('Preparation Service : findPreparationById : this._preparation is null detected');
      //  if there is not current preparation
      if (id === 0) {
        console.log('Preparation Service : findPreparationById : id Zero detected, creating a new preparation');
        // if asked id is 0 then we initialize a new preparation and then navigate to food component (for ingredients choice)
        this.preparation  = new Meal();
        this.preparation.name = 'Nouvelle préparation';
        this.preparation.id = 0;
        this.preparation.category = new Categorie(1, '', null, null);
        this.preparationType = 'NEW PREPARATION';
        console.log('Preparation Service : findPreparationById : ' +
                    'new preparation created. Current preparation = ', this.preparation);
        PreparationService.statut.next('nouvelle preparation');
        this.router.navigateByUrl('/food');
      } else {
        console.log('Preparation Service : findPreparationById : id is not zero, so trying to find a recipe with this id :', id);
        // if asked id is not zero, try ton find a recipe for this id.
        this.recipeService.getById(id).subscribe(
          (recipe) => {
            console.log('Preparation Service : findPreparationById : ' +
            'retour de recipeService.getById(id=' + id + ')', recipe, 'type du retour = ' + typeof recipe);
            this.preparation = Object.assign(new Meal(), recipe);
            this.preparationType = 'RECIPE';
            console.log('Preparation Service : findPreparationById : nouvelle valeur de preparation : ', this.preparation);
            PreparationService.statut.next('nouvelle valeur de preparation');
          },
          (error: any) => {
            console.log('Preparation Service : findPreparationById : retour de recipeService.getById(id=' + id + ') en erreur :', error );
            this.preparation = null;
            this.preparationType = '';
            if (error.status === 404) {
                const dialogRef = this.dialog.open(
                  DialogOkComponent,
                  {data: {title: 'Erreur', message: 'La recette ' + id + ' n\'existe pas !'}}
                );
                dialogRef.afterClosed().subscribe(result => {
                    PreparationService.statut.next('Erreur : La recette ' + id + ' n\'existe pas !');
                    this.location.back();
                  } );
            } else {
              const dialogRef = this.dialog.open(
                DialogOkComponent,
                {data: {title: 'Erreur', message: 'Une erreur est survenue lors de la recherche de la recette'}}
              );
              dialogRef.afterClosed().subscribe(result => {
                PreparationService.statut.next('Une erreur est survenue lors de la recherche de la recette');
                this.location.back();
              } );
            }
          }
         );
         PreparationService.statut.next('appel lancé');
      }

    } else {
      console.log('Preparation Service : findPreparationById : this._preparation is not null detected');
      // if there is a current preparation in edition
      if (this.preparation.id !== id) {
        console.log('Preparation Service : findPreparationById : ' +
                    'this._preparation.id (' + this.preparation.id + ') is diffrent from asked id ' + id + '), tell it to user !');
        // if asked id is different from current id then alert user that this operation is not allowed
        const dialogRef = this.dialog.open(
          DialogOkComponent,
          {data:
            {
              title: 'Action interdite',
              message: 'Désolé, vous ne pouvez pas faire cette action car ' + this.preparation.name + ' est déja en cours d\'édition !'
            }
          }
        );
      } else {
        console.log('Preparation Service : findPreparationById : ' +
                    'this._preparation.id (' + this.preparation.id + ') is equal from asked id ' + id + '), nothing to do !');
        // if asked id is equal to current preparation id there is nothing to do
      }
    }
    console.log('Preparation Service : exit');
    return PreparationService.statut;
  }



  //
  // Save a preparation as new recipe
  //
  public savePreparationAsRecipe(recipeName: string, recipeComment: string, category: Categorie) {

    console.log('Preparation Service : savePreparationAsRecipe : preparation avant envoi : ',
                this.preparation, recipeName, recipeComment, category);
    // call recipe service to create a new recipe from this preparation
    this.recipeService.create(this.preparation, recipeName, recipeComment, category).subscribe(
      (recipeCreatedByBack) => {
        console.log('Preparation Service : savePreparationAsRecipe : retour back apres create recipe', recipeCreatedByBack);
        if (recipeCreatedByBack && recipeCreatedByBack.id) {
          // si en retour du back on a bien recu une nouvelle recette avec son id
          // navigue pour afficher la nouvelle recette
          this.razPreparation();
          this.router.navigateByUrl('/recipe/' + recipeCreatedByBack.id);
        } else {
          const dialogRef = this.dialog.open(
            DialogOkComponent,
            {data: {title: 'Erreur', message: 'Une erreur est survenue lors de la sauvegarde de la recette !'}}
          );
        }
      },
      (error) => {
        console.log('Preparation Service : savePreparationAsRecipe : retour back apres create recipe : error', error);
        const dialogRef = this.dialog.open(
          DialogOkComponent,
          {data: {title: 'Erreur', message: 'Une erreur est survenue lors de la sauvegarde de la recette !'}}
        );
      }
   );
  }

  //
  // Update a recipe
  //
  public UpdateRecipe() {

    console.log('Preparation Service : UpdateRecipe : preparation avant envoi : ', this.preparation);
    // call recipe service to create a new recipe from this preparation
    this.recipeService.update(this.preparation).subscribe(
      (recipUpdatedByBack) => {
        console.log('Preparation Service : UpdateRecipe : retour back apres update recipe', recipUpdatedByBack);
        if (recipUpdatedByBack) {
          this.router.navigateByUrl('/recipe/' + recipUpdatedByBack.id);
        } else {
          const dialogRef = this.dialog.open(
            DialogOkComponent,
            {data: {title: 'Erreur', message: 'Une erreur est survenue lors de la mise ajour de la recette'}}
          );
        }
      },
      (error) => {
        console.log('Preparation Service : UpdateRecipe : retour back apres update recipe : error', error);
        const dialogRef = this.dialog.open(
          DialogOkComponent,
          {data: {title: 'Erreur',
                  message: 'Une erreur est survenue lors de la mise à jour de la recette !' + '\r\n' +
                            error.error.error + '\r\n' +
                            error.error.message
                }}
        );
      }
   );
  }




// Conversion ingredients[] <=> RecipeIngredients[] dans les 2 sens


  // récupère un tableau d'ingrédients a partir du tableau de recipeIngredient de la preparation
  public get ingredientsList(): Ingredient[] {
    console.log('preparation service : get ingredientsList : enter : this.preparation =', this.preparation);
    const ingredientsList = new Array<Ingredient>();
    if (this.preparation != null) {
      if (this.preparation.listOfIngredients !=  null) {
          this.preparation.listOfIngredients.forEach(recipeIngredient => {
            ingredientsList.push(recipeIngredient.ingredient);
          });
      }
    }
    console.log('preparation service : get ingredientsList : exit : returned ingredientsList = ', ingredientsList);
    return ingredientsList;
  }




  // met a jour le tableau de recipeIngredient de la preparation a partir du tableau d'ingredients fourni en paramètre
  // si l'ingredient existe déja ne fait rien, si il n'existe pas alors on l'ajoute avec une quantité a 100 (grs)
  // on retire tous les ingrédients qui ne sont plus dans le tableau fourni
  public set ingredientsList(ingredientList: Ingredient[] ) {
    console.log('PreparationService set ingredientsList : liste recue : ', ingredientList, 'Preparation en cours : ', this.preparation);
    if (this.preparation) {

      const tempListRecipeIngredient: RecipeIngredient[] = new Array<RecipeIngredient>();

      ingredientList.forEach(ingredientToAdd => {
        let recipeIngredientFound: RecipeIngredient = null;
        if (this.preparation.listOfIngredients !=  null) {
          recipeIngredientFound = this.preparation.listOfIngredients.find(obj => {
            return obj.ingredient === ingredientToAdd;
          });
        }
        if (recipeIngredientFound != null) {
          tempListRecipeIngredient.push(recipeIngredientFound);
        } else {
          const recipeIngredientNew = new RecipeIngredient();
          recipeIngredientNew.ingredient = ingredientToAdd;
          recipeIngredientNew.quantity = 100; // 100 grs quantité par défaut
          // recipeIngredientNew.recipe = this.preparation;
          tempListRecipeIngredient.push(recipeIngredientNew);
        }
      });
      console.log('PreparationService : set ingredientsList : liste emise ', tempListRecipeIngredient);
      // Set the updated list of ingredient in the prepataion
      this.preparation.listOfIngredients = tempListRecipeIngredient;

      PreparationService.statut.next('ajout ingrédients');

    } else {
      console.log('PreparationService : set ingredientsList : Erreur preparation est null', this.preparation);
    }
  }



}

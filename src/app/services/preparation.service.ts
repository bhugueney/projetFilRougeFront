import { Router } from '@angular/router';
import { RecipeIngredient } from './../models/recipe-ingredient.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Meal } from './../models/meal.model';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';




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


  constructor(private router: Router) {
    this.preparation = null;
  }

  public setNewPreparation() {
    if (this.preparation === null) {
      this.preparation = new Meal();
    this.preparation.id = 0;
    this.preparation.name = 'Nouvelle préparation';
    this.router.navigateByUrl('/food');
    } else {
      alert('Erreur une preparation n° ' + this.preparation.id + ' est déja en cours d\'édition !');
    }
  }


}

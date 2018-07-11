import { RecipeIngredient } from './../models/recipe-ingredient.model';
import { IngredientService } from './ingredient.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipeList: Recipe[];

  constructor(private ingredientService: IngredientService) {
    this.recipeList = new Array<Recipe>();
    for (let i = 1; i < 10; i++) {
      this.recipeList.push(this.createFakeRecipe(i, i));
    }
  }

  public getAll(): Recipe[] {
    return this.recipeList;
  }


  public getById(id: number): Recipe {
    if (id < this.recipeList.length) {
      return this.recipeList[id - 1];
    } else {
      return null;
    }
  }

  public getNew(): Recipe {
    const newRecipe = new Recipe();
    newRecipe.id = 0;
    newRecipe.listIngredient = null;
    newRecipe.name = '(Nouvelle préparation)';
    return newRecipe;
  }

  public DeleteRecipeIngredient(recipe: Recipe, ingredientToDelete: RecipeIngredient): Recipe {
    recipe.listIngredient = recipe.listIngredient.filter(ingredientItem => ingredientItem !== ingredientToDelete);
    return recipe;
  }

  public DeleteRecipeAllIngredients(recipe: Recipe): Recipe {
    recipe.listIngredient = new Array<RecipeIngredient>();
    return recipe;
  }



  private createFakeRecipe(id: number, numIngredients: number): Recipe {
    const fakeRecipe = new Recipe();
    fakeRecipe.id = id;
    fakeRecipe.name = 'Recette N° ' + id;
    fakeRecipe.comment = 'ceci est la recette n° ' + id;
    fakeRecipe.energy = 0.0;
    fakeRecipe.water = 0.0;
    fakeRecipe.protein = 0.0;
    fakeRecipe.glucid = 0.0;
    fakeRecipe.lipid = 0.0;
    fakeRecipe.sugar = 0.0;
    fakeRecipe.amidon = 0.0;
    fakeRecipe.fiber = 0.0;
    fakeRecipe.unsaturedFattyAcides = 0.0;
    fakeRecipe.monoUnsaturedFattyAcides = 0.0;
    fakeRecipe.polyUnsaturedFattyAcides = 0.0;
    fakeRecipe.salt = 0.0;

    // create ingredients list
    const listIngredient: RecipeIngredient[] = new Array<RecipeIngredient>();
    for (let i = 1; i <= numIngredients; i++) {
      const recipeIngredient: RecipeIngredient = new RecipeIngredient();
      recipeIngredient.recipe = fakeRecipe;
      // recipeIngredient.ingredient = this.ingredientService.getById(i);
      this.ingredientService.getById(i).subscribe(
        (ingredient: Ingredient) => {
          recipeIngredient.ingredient = ingredient;
          recipeIngredient.quantity = 100.0 * i;
          listIngredient.push(recipeIngredient);
        },
        (error) => { } // What do you want to do John Snow.... Nothing ?!
      );

    }
    fakeRecipe.listIngredient = listIngredient;

    return fakeRecipe;

  }

}

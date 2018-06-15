import { IngredientService } from './ingredient.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Categorie } from '../models/categorie.model';
import { User } from '../models/user.model';
import { Ingredient } from '../models/ingredient.model';
import { RecipeIngredient } from '../models/recipe-ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private ingredientService: IngredientService) { }

  public getById(id: number): Recipe {
    return this.getFakeRecipe();
  }


  private getFakeRecipe(): Recipe {

    const fakeRecipe = new Recipe();

    const recipeIngredient1: RecipeIngredient = new RecipeIngredient();
    recipeIngredient1.id = 1;
    recipeIngredient1.recipe = fakeRecipe;
    recipeIngredient1.ingredient = this.ingredientService.getById(1);
    recipeIngredient1.quantity = 200.0;

    const recipeIngredient2: RecipeIngredient = new RecipeIngredient();
    recipeIngredient1.id = 2;
    recipeIngredient2.recipe = fakeRecipe;
    recipeIngredient2.ingredient = this.ingredientService.getById(2);
    recipeIngredient2.quantity = 300.0;

    const recipeIngredient3: RecipeIngredient = new RecipeIngredient();
    recipeIngredient1.id = 3;
    recipeIngredient3.recipe = fakeRecipe;
    recipeIngredient3.ingredient = this.ingredientService.getById(3);
    recipeIngredient3.quantity = 50;

    const listIngredient: RecipeIngredient[] = new Array<RecipeIngredient>();
    listIngredient.push(recipeIngredient1);
    listIngredient.push(recipeIngredient2);
    listIngredient.push(recipeIngredient3);

    fakeRecipe.listIngredient = listIngredient;
    fakeRecipe.id = 0;
    fakeRecipe.name = '(Nouvelle préparation)';
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


    return fakeRecipe;

  }

}

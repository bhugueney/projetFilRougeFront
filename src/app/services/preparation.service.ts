import { RecipeIngredient } from './../models/recipe-ingredient.model';
import { User } from './../models/user.model';
import { Categorie } from './../models/categorie.model';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class PreparationService {

  private preparation: Recipe;



  constructor() {

    
     // Add somme ingrédients to mock
    this.ingredients.push();

    this.ingredients.push(new Ingredient(
      1,
      'Tomates',
      'tomates.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      fruitCateg,
      systemUser,
      'ceci est un commentaire'));

    this.ingredients.push(new Ingredient(
      1,
      'Poireau',
      'ingredients_default.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      fruitCateg,
      systemUser,
      'ceci est un commentaire'));


  }



  private getFakeRecipe(): Recipe {

    const fruitCateg: Categorie = new Categorie(1, 'Fruits', null);
    const systemUser: User = new User(1, '', 'System', '');

    const carottes = new Ingredient(
      1,
      'Carottes',
      'carottes.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      fruitCateg,
      systemUser,
      'ceci est un commentaire');

    const tomate = new Ingredient(
      1,
      'Tomates',
      'tomates.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      fruitCateg,
      systemUser,
      'ceci est un commentaire');

    const poireau = new Ingredient(
      1,
      'Poireau',
      'ingredients_default.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      fruitCateg,
      systemUser,
      'ceci est un commentaire'));

    const fakeRecipe = new Recipe();

    const recipeIngredient1: RecipeIngredient = new RecipeIngredient();
    recipeIngredient1.recipe = fakeRecipe;
    recipeIngredient1.ingredient = carottes;
    recipeIngredient1.quantity = 1.5;

    const recipeIngredient2: RecipeIngredient = new RecipeIngredient();
    recipeIngredient2.recipe = fakeRecipe;
    recipeIngredient2.ingredient = tomate;
    recipeIngredient2.quantity = 1.0;

    const recipeIngredient3: RecipeIngredient = new RecipeIngredient();
    recipeIngredient2.recipe = fakeRecipe;
    recipeIngredient2.ingredient = poireau;
    recipeIngredient2.quantity = 2.5;

    return fakeRecipe;
  }
}

import { User } from './../models/user.model';
import { Categorie } from './../models/categorie.model';
import { Ingredient } from './../models/ingredient.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreparationService {

   ingredients: Ingredient[];

  constructor() {

    this.ingredients = new Array;

    const fruitCateg: Categorie = new Categorie(1, 'Fruits', null);
    const systemUser: User = new User(1, '', 'System', '');

     // Add somme ingrédients to mock
    this.ingredients.push(new Ingredient(
      1,
      'Carottes',
      'carottes.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      fruitCateg,
      systemUser,
      'ceci est un commentaire'));

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

  getListIngredients(): Ingredient[] {
    return this.ingredients;
  }


}

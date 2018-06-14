import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { User } from '../models/user.model';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor() { }

  static fruitCateg: Categorie = new Categorie(1, 'Fruits', null);

  static systemUser: User = new User(1, '', 'System', '');

  public getCarotte(): Ingredient {
  return new Ingredient(
    1,
    'Carottes',
    'carottes.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    IngredientService.fruitCateg,
    IngredientService.systemUser,
    'ceci est un commentaire');
  }


}

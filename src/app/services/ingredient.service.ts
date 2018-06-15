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

  public getById(id: number): Ingredient {
    let ingredient: Ingredient = this.getUnknown();
    switch (id) {
      case 1: { ingredient = this.getCarotte(); break;}
      case 2: { ingredient =  this.getTomate(); break;}
      case 3: { ingredient =  this.getPoireau();  break;}
    }
    return ingredient;
  }


 private getCarotte(): Ingredient {
  return new Ingredient(
    1,
    'Carottes',
    'carottes.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    IngredientService.fruitCateg,
    IngredientService.systemUser,
    'ceci est un commentaire');
  }

  private getTomate(): Ingredient {
    return new Ingredient(
      2,
      'Tomates',
      'tomates.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      IngredientService.fruitCateg,
      IngredientService.systemUser,
      'ceci est un commentaire');
    }

    private getPoireau(): Ingredient {
      return new Ingredient(
        3,
        'Poireau',
        'defaultIngredient.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        IngredientService.fruitCateg,
        IngredientService.systemUser,
        'ceci est un commentaire');
      }

      private getUnknown(): Ingredient {
        return new Ingredient(
          0,
          'Inconnu',
          'defaultIngredient.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
          IngredientService.fruitCateg,
          IngredientService.systemUser,
          'ceci est ingredient inconu');
        }

}

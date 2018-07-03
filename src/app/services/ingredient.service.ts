import { Ingredient } from './../models/ingredient.model';
import { Injectable } from '@angular/core';
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
    let retIngredient: Ingredient;
    switch (id) {
      case 2: { retIngredient = this.getCarotte(); break; }
      case 1: { retIngredient =  this.getTomate(); break; }
      case 3: { retIngredient =  this.getPoelee();  break; }
      case 4: { retIngredient =  this.getPoireau();  break; }
      default: {retIngredient =  this.getUnknown();  break; }
    }
    return retIngredient;
  }

  private getTomate(): Ingredient {
    return new Ingredient(
      1,
      'Tomates',
      'tomates.jpg', 100, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      IngredientService.fruitCateg,
      IngredientService.systemUser,
      'ceci est un commentaire');
    }

    private getCarotte(): Ingredient {
      return new Ingredient(
        2,
        'Carotte',
        'carottes.jpg', 200, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        IngredientService.fruitCateg,
        IngredientService.systemUser,
        'ceci est un commentaire');
      }

      private getPoelee(): Ingredient {
        return new Ingredient(
          3,
          'Poêlée de pommes de terre préfrites, lardons ou poulet, et autres, sans légumes verts',
          'poelee.jpg', 200, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
          IngredientService.fruitCateg,
          IngredientService.systemUser,
          'ceci est un commentaire');
        }
  

      private getPoireau(): Ingredient {
        return new Ingredient(
          4,
          'Poireau',
          'poireau.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
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

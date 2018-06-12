import { Ingredient } from './../models/ingredient.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreparationService {

   ingredients: Ingredient[];

  constructor() {

    // Add somme ingrédients to mock
    this.ingredients.push(Object.assign(new Ingredient(), JSON.parse(`
    {
      _id: 1,
      _name: 'Carrotes'
      '_urlImage': 'carrotes.img',
      '_energy': 50,
      '_water': 10,
      '_protein': 30,
      '_glucid': 20,
      '_lipid': 30,
      '_sugar': 25,
      '_amidon': 10,
      '_fiber': 10,
      '_unsaturedFattyAcides': 30,
      '_monoUnsaturedFattyAcides': 20,
      '_polyUnsaturedFattyAcides': 50,
      '_salt': 5,
      '_categorie': {_id: 1, _name: 'Fruits'},
      '_owner': {'_id': 0, '_firstName': '', '_lastName': 'system', '_email': '' },
      '_comment': 'ceci n\'est pas une carrotte'
     }
   `)));

   this.ingredients.push(Object.assign(new Ingredient(), JSON.parse(`
   {
     _id: 2,
     _name: 'Tomates'
     '_urlImage': 'tomates.img',
     '_energy': 50,
     '_water': 10,
     '_protein': 30,
     '_glucid': 20,
     '_lipid': 30,
     '_sugar': 25,
     '_amidon': 10,
     '_fiber': 10,
     '_unsaturedFattyAcides': 30,
     '_monoUnsaturedFattyAcides': 20,
     '_polyUnsaturedFattyAcides': 50,
     '_salt': 5,
     '_categorie': {_id: 1, _name: 'Fruits'},
     '_owner': {'_id': 0, '_firstName': '', '_lastName': 'system', '_email': '' },
     '_comment': 'ceci n\'est pas une tomate'
    }
  `)));




   }
}

import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Array<Categorie> = [];

  constructor() {
    // To link to back
    this.categories.push(new Categorie(1, 'Fruit', null));
    this.categories.push(new Categorie(2, 'Légume', null));
    this.categories.push(new Categorie(3, 'Viande', null));
  }



  getSelectableCategories(): Array<Categorie> {
    return this.categories;
  }

  getCategoryById(id: number): Categorie {
    const cat: Categorie = this.categories.find((c: Categorie) => c.id === id);

    return cat;
  }

}

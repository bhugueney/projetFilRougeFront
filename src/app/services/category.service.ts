import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Array<Categorie> = [];

  constructor() {
    // To link to back
    this.categories.push(new Categorie(1, 'Fruits', null));
    this.categories.push(new Categorie(2, 'Légumes', null));
    this.categories.push(new Categorie(3, 'Viandes', null));
    this.categories.push(new Categorie(4, 'Fruits Frais', this.categories[0]));
    this.categories.push(new Categorie(5, 'Fruits Sec', this.categories[0]));
    this.categories.push(new Categorie(6, 'Légumes vert', this.categories[1]));
    this.categories.push(new Categorie(7, 'féculents', this.categories[1]));
    this.categories.push(new Categorie(8, 'Boeuf', this.categories[2]));
    this.categories.push(new Categorie(9, 'Agneau', this.categories[2]));
  }

public getMainCategories(): Categorie[] {
  return this.categories.filter(element => element.parent === null);
}

  getSelectableCategories(): Array<Categorie> {
    return this.categories;
  }

  getCategoryById(id: number): Categorie {
    const cat: Categorie = this.categories.find((c: Categorie) => c.id === id);

    return cat;
  }

}

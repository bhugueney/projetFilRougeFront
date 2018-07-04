import { IngredientService } from './ingredient.service';
import { Ingredient } from './../models/ingredient.model';
import { Categorie } from './../models/categorie.model';
import { CategoryService } from './category.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  // list of categories
  private _categoriesList: Categorie[];
  // list of ingredients
  private _ingredientsList: Ingredient[];

  constructor(private categorieService: CategoryService, private ingredientService: IngredientService) {
    this._categoriesList = categorieService.getMainCategories();
    this._ingredientsList = ingredientService.ingredientsList;
  }

  // Getters and setters
  public get categoriesList(): Categorie[] {
    return this._categoriesList;
  }
  public set categoriesList(value: Categorie[]) {
    this._categoriesList = value;
  }

  public get ingredientsList(): Ingredient[] {
    return this._ingredientsList;
  }
  public set ingredientList(value: Ingredient[]) {
    this._ingredientsList = value;
  }
}

import { Ingredient } from './../../models/ingredient.model';
import { Categorie } from './../../models/categorie.model';
import { FoodService } from './../../services/food.service';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  // list of ingredients to display
  private _ingredients: Ingredient[] = new Array<Ingredient>();
  // list of categories level 1
  private _listCategoriesN1: Categorie[] = new Array<Categorie>();
  // filters
  private _filters = ['global', 'categories'];
  // filter selected
  private _filterSelected = 'global';
  // list of ingredients selected
  private _selectedIngredients: Ingredient[] = new Array<Ingredient>();

  constructor(private foodService: FoodService) {
    this._listCategoriesN1 = foodService.categoriesList;
    this._ingredients = foodService.ingredientsList;
  }

  ngOnInit() {
  }

  public setFilterFromSelector(e: MatSelectChange) {
    this.filterSelected = e.value;
  }

public moveIngredientInPreparationList(ingredient: Ingredient) {
 if (this.selectedIngredients.includes(ingredient)) {

 } else {
   this.selectedIngredients.push(ingredient);
 }
}

  // Getters and setters
  public get ingredients(): Ingredient[] {
    return this._ingredients;
  }
  public set ingredients(value: Ingredient[]) {
    this._ingredients = value;
  }

  public get listCategoriesN1(): Categorie[] {
    return this._listCategoriesN1;
  }
  public set listCategoriesN1(value: Categorie[]) {
    this._listCategoriesN1 = value;
  }

  public get filters(): string[] {
    return this._filters;
  }
  public set filters(value: string[]) {
    this._filters = value;
  }

  public get filterSelected(): string {
    return this._filterSelected;
  }
  public set filterSelected(value: string) {
    this._filterSelected = value;
  }

  public get selectedIngredients(): Ingredient[] {
    return this._selectedIngredients;
  }
  public set selectedIngredients(value: Ingredient[]) {
    this._selectedIngredients = value;
  }

}

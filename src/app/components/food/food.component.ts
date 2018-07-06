import { Ingredient } from './../../models/ingredient.model';
import { Categorie } from './../../models/categorie.model';
import { FoodService } from './../../services/food.service';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { PreparationService } from '../../services/preparation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  // list of ingredients to display
  private _ingredients: Ingredient[];
  // list of categories level 1
  private _listCategories: Categorie[];
  // filters
  private _filters = ['global', 'categories'];
  // filter selected
  private _filterSelected = 'global';
  // list of ingredients selected
  private _selectedIngredients: Ingredient[];

  constructor(private foodService: FoodService) {
    this.selectedIngredients = new Array<Ingredient>();
  }

  ngOnInit() {
    this.ingredients = this.foodService.getGlobalListIngredients();
  }

  public setFilterFromSelector(e: MatSelectChange) {
    if (e.value === 'categories') {
      this._listCategories = this.foodService.getMainCategories();
    }
    this.filterSelected = e.value;
  }

  public selectedCategory(id: number) {
    const cat: Categorie = this.foodService.getCategoryById(id);
    if (cat.listOfChildren.length !== 0) {
      this._listCategories = cat.listOfChildren;
    }
  }

  public moveIngredientInPreparationList(ingredient: Ingredient) {
    if (this.selectedIngredients.includes(ingredient)) {
      this.selectedIngredients.splice(this.selectedIngredients.indexOf(ingredient));
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
    return this._listCategories;
  }
  public set listCategoriesN1(value: Categorie[]) {
    this._listCategories = value;
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

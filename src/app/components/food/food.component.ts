import { Location } from '@angular/common';
import { CategoryService } from './../../services/category.service';
import { IngredientService } from './../../services/ingredient.service';
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
  private _filters = ['categories', 'liste globale'];
  // filter selected
  private _filterSelected = 'categories';
  // list of ingredients selected
  private _selectedIngredients: Ingredient[];

  private _routerLink: string;

  constructor(private location: Location, private foodService: FoodService,
    private route: Router, private ingredientService: IngredientService) {
    this.selectedIngredients = new Array<Ingredient>();
  }

  ngOnInit() {
    /*this.ingredientService.ingredientsListRead.subscribe(
      (ingredientsList) => {this.ingredients = ingredientsList; },
      () => {}
    );*/
    this.getGlobalListIngredients();
    this.listCategories = this.foodService.getMainCategories();
    this.selectedIngredients = this.foodService.getListIngredients();
  }

  public getGlobalListIngredients() {
    this.ingredientService.getGlobalList().subscribe(
      (list) => {
        this.ingredients = list;
        list.forEach(e => {
          if (e.urlImage === null) {e.urlImage = 'defaultIngredient.jpg'; }
        });
      }
    );
  }

  control(id: number): boolean {
    return this.selectedIngredients.filter(e => e.id === id).length > 0;
  }

  public setFilterFromSelector(e: MatSelectChange) {
    this.filterSelected = e.value;
    if (this.filterSelected === 'liste globale') {
      this.getGlobalListIngredients();
    }
    if (this.filterSelected === 'categories') {
      this.listCategories = this.foodService.getMainCategories();
    }
  }

  public selectedCategory(id: number, e: Event) {
    e.preventDefault();
    const cat: Categorie = this.foodService.getCategoryById(id);
    if (cat.listOfChildren.length !== 0) {
      this.listCategories = cat.listOfChildren;
    } else {
      this.filterSelected = '';
      this.ingredients = this.foodService.getFilterListIngredientByCategoryId(cat.id);
    }
  }

  public moveIngredientInPreparationList(ing: Ingredient) {
    const indexIngredient = this.selectedIngredients.findIndex((e) => e.id === ing.id);
    if (this.control(ing.id)) {
      this.selectedIngredients.splice(indexIngredient, 1);
    } else {
      this.selectedIngredients.push(ing);
    }
  }

  public loadListIngredients(list: Ingredient[]) {
    this.foodService.setListIngredients(list);
  }

  public displayIngredient(id: number) {
    if (this.foodService.getRecipeById(id)) {
      console.log('recipe');
      this.route.navigateByUrl('/preparation/' + id);
    } else {
      console.log('ingredient');
      this.route.navigateByUrl('/ingredient/' + id);
    }
  }

  public rollBack(e: Event) {
    e.preventDefault();
    this.location.back();
  }

  // Getters and setters
  public get ingredients(): Ingredient[] {
    return this._ingredients;
  }
  public set ingredients(value: Ingredient[]) {
    this._ingredients = value;
  }

  public get listCategories(): Categorie[] {
    return this._listCategories;
  }
  public set listCategories(value: Categorie[]) {
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

  public get routerLink(): string {
    return this._routerLink;
  }
  public set routerLink(value: string) {
    this._routerLink = value;
  }

}

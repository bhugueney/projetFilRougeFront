import { CategoryService } from './../../services/category.service';
import { IngredientService } from './../../services/ingredient.service';
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
  private _ingredients: Ingredient[];
  // list of categories level 1
  private _listCategories: Categorie[];
  // filters
  private _filters = ['aucun', 'categories'];
  // filter selected
  private _filterSelected = 'aucun';
  // list of ingredients selected
  private _selectedIngredients: Ingredient[];

  constructor(private foodService: FoodService, private ingredientService: IngredientService,
    private categoryService: CategoryService) {
      this.selectedIngredients = new Array<Ingredient>();
    }

    ngOnInit() {
      /*this.ingredientService.ingredientsListRead.subscribe(
        (ingredientsList) => {this.ingredients = ingredientsList; },
        () => {}
      );*/
      this.ingredients = this.foodService.getGlobalListIngredients();
      this.listCategories = this.foodService.getMainCategories();
    }

    public setFilterFromSelector(e: MatSelectChange) {
      this.filterSelected = e.value;
      if (this.filterSelected === 'aucun') {
        this.ingredients = this.foodService.getGlobalListIngredients();
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
        this.filterSelected = 'ingredients: ' + cat.name;
        this.ingredients = this.foodService.getFilterListIngredientByCategoryId(cat.id);
        console.log(this.ingredients);
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

  }

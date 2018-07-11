import { FoodComponent } from './../components/food/food.component';
import { PreparationService } from './preparation.service';
import { RecipeService } from './recipe.service';
import { IngredientService } from './ingredient.service';
import { CategoryService } from './category.service';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private categorieService: CategoryService, private ingredientService: IngredientService,
    private preparationService: PreparationService, private recipeService: RecipeService) {
    }

    // method to get global list of ingredients
    /*public getGlobalListIngredients() {
      this.ingredientService.getGlobalList().subscribe(
        (list) => {this.foodComponent.ingredients = list; }
      );
    }*/

    // method to get list since a category
    public getFilterListIngredientByCategoryId(catId: number) {
      return this.ingredientService.getListByCategoryId(catId);
    }

    // method to get main categories
    public getMainCategories() {
      return this.categorieService.getMainCategories();
    }

    // method to get details of category
    public getCategoryById(id: number) {
      return this.categorieService.getCategoryById(id);
    }

    // method to send a list of preparation
    public setListIngredients(list: Ingredient[]) {
      this.preparationService.ingredientsList = list;
    }

    // method to load a list of preparation
    public getListIngredients(): Ingredient[] {
      return this.preparationService.ingredientsList;
    }

    // method to get a recipe by id
    public getRecipeById(id: number): Recipe {
      return this.recipeService.getById(id);
    }
  }

import { RecipeService } from './recipe.service';
import { IngredientService } from './ingredient.service';
import { CategoryService } from './category.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private categorieService: CategoryService, private ingredientService: IngredientService,
    private recipeService: RecipeService) {
    }

    // method to get global list of ingredients
    public getGlobalListIngredients() {
      return this.ingredientService.getGlobalList();
    }

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
  }

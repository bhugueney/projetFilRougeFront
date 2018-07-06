import { RecipeService } from './recipe.service';
import { IngredientService } from './ingredient.service';
import { Ingredient } from './../models/ingredient.model';
import { Categorie } from './../models/categorie.model';
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

  // method to get main categories
  public getMainCategories() {
    return this.categorieService.getMainCategories();
  }

  // method to get details of category
  public getCategoryById(id: number) {
    return this.categorieService.getCategoryById(id);
  }
}

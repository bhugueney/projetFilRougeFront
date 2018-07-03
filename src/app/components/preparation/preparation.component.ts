import { RecipeIngredient } from './../../models/recipe-ingredient.model';
import { Ingredient } from './../../models/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css']
})
export class PreparationComponent implements OnInit {

  preparation: Recipe;
  ingredientDetails: Ingredient;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.preparation = this.recipeService.getById(0);
    this.ingredientDetails = this.preparation.listIngredient[0].ingredient;
    this.preparation.dataCalcul();
  }

  public deleteRecipeIngredient(recipeIngredient: RecipeIngredient) {
    this.recipeService.DeleteRecipeIngredient(this.preparation, recipeIngredient);
    this.preparation.dataCalcul();
  }


  public increaseQty(recipeIngredient: RecipeIngredient): void {
    recipeIngredient.quantity += 10;
    this.preparation.dataCalcul();
  }

  public decreaseQty(recipeIngredient: RecipeIngredient): void {
    recipeIngredient.quantity -= 10;
    if (recipeIngredient.quantity < 0.0) {
      recipeIngredient.quantity = 0.0;
    }
    this.preparation.dataCalcul();
  }


  public updateQty(recipeIngredient: RecipeIngredient, Qty: number) {
    recipeIngredient.quantity = +Qty;
    if (recipeIngredient.quantity < 0.0) {
      recipeIngredient.quantity = 0.0;
    }
    this.preparation.dataCalcul();
  }

  public showDetails(ingredientToShow: Ingredient) {
    this.ingredientDetails = ingredientToShow;
  }
}

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

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.preparation = this.recipeService.getById(0);
    this.preparation.dataCalcul();
  }

  public deleteRecipeIngredient(recipeIngredientPosition: number) {
    console.log('Position : ' + recipeIngredientPosition);
    this.preparation.listIngredient.splice(recipeIngredientPosition, 1);
    this.preparation.dataCalcul();
  }


  public increaseQty(recipeIngredientPosition: number): void {
    this.preparation.listIngredient[recipeIngredientPosition].quantity += 10;
    this.preparation.dataCalcul();
  }

  public decreaseQty(recipeIngredientPosition: number): void {
    this.preparation.listIngredient[+recipeIngredientPosition].quantity -= 10;
    if (this.preparation.listIngredient[+recipeIngredientPosition].quantity < 0.0) {
      this.preparation.listIngredient[+recipeIngredientPosition].quantity = 0.0;
    }
    this.preparation.dataCalcul();
  }


  public updateQty(recipeIngredientPosition: number, Qty: number) {
    this.preparation.listIngredient[+recipeIngredientPosition].quantity = +Qty;
    if (this.preparation.listIngredient[+recipeIngredientPosition].quantity < 0.0) {
      this.preparation.listIngredient[+recipeIngredientPosition].quantity = 0.0;
    }
    this.preparation.dataCalcul();
  }
}

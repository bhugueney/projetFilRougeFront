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
  }

  public deleteRecipeIngredient(recipeIngredientPosition: number) {
    this.preparation.listIngredient.splice(recipeIngredientPosition, 1);
  }
}

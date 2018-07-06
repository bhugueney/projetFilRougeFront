import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { PreparationService } from '../../services/preparation.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipeList: Recipe[];

  constructor(private recipeService: RecipeService, private preparationService: PreparationService, private router: Router) {
      this.recipeList = recipeService.getAll();
   }

  ngOnInit() {
  }

  public get recipe(): Recipe {
    return this.recipeService.getById(1);
  }

  public editRecipe(recipe: Recipe) {
    this.preparationService.preparation = recipe;
    this.router.navigate(['/preparation']);
  }
}

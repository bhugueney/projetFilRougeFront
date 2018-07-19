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
  }

  ngOnInit() {
    this.recipeService.getAll().subscribe( (returnedRecipeList: Recipe[]) => {  this.recipeList = returnedRecipeList; }) ;
 
  }

  public editRecipe(recipe: Recipe) {
    this.preparationService.preparation = recipe;
    this.router.navigate(['/preparation']);
  }
}

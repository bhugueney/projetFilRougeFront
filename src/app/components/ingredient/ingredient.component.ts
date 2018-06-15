import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientService } from '../../services/ingredient.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { TypeCheckCompiler } from '@angular/compiler/src/view_compiler/type_check_compiler';
import { Meal } from '../../models/meal.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  ingredient: Ingredient;

  recette: Recipe;

  constructor(private ingredientService: IngredientService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const idRequested: number = +params['id'];
      this.ingredient = this.ingredientService.getById(idRequested);
    }
    );
  }

  ngOnInit() {
    // this.ingredient = this.ingredientService.getCarotte();
    // this.ingredient = this.recipeService.getRecipeById(1);

    // This command allow to get name of real class
    switch (this.ingredient.constructor.name) {
      case Recipe.name:
        console.log('this.ingredient is a recipe');
        break;
      case Ingredient.name:
        console.log('this.ingredient is a basic ingredient');
        break;
      case Meal.name:
        console.log('this.ingredient is a meal');
        break;
    }

    console.log('type of ingredient : ' + typeof (this.ingredient));

  }


}

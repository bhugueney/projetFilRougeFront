import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientService } from '../../services/ingredient.service';
import { Recipe } from '../../models/recipe.model';
import { Meal } from '../../models/meal.model';
import { ActivatedRoute } from '@angular/router';
import { MatSlideToggleChange, MatSelectChange } from '@angular/material';
import { Categorie } from '../../models/categorie.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  // Ingredient displayed by component
  ingredient: Ingredient;

  categories: Array<Categorie> = [];

  // This boolean indicate if we can edit Ingredient or not.
  isEditable = false;

  constructor(private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private categoryService: CategoryService) {
    this.route.params.subscribe(params => {
      const idRequested: number = +params['id'];
      this.initCategoriesList();
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

  toggleEditSlide(e: MatSlideToggleChange) {
    console.log(e);
    this.isEditable = e.checked;
  }

  initCategoriesList() {
    this.categories = this.categoryService.getSelectableCategories();
  }

  checkIngredient(e: Event) {
    console.log(this.ingredient);
    e.preventDefault();
  }

  setCategoryFromSelector(e: MatSelectChange) {
    const categoryId: number = +e.value;
    this.ingredient.categorie = this.categoryService.getCategoryById(categoryId);
  }



}

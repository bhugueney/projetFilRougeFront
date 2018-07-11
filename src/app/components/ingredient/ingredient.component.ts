import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientService } from '../../services/ingredient.service';
import { Recipe } from '../../models/recipe.model';
import { Meal } from '../../models/meal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSlideToggleChange, MatSelectChange } from '@angular/material';
import { Categorie } from '../../models/categorie.model';
import { CategoryService } from '../../services/category.service';
import { isEmpty } from 'rxjs/internal/operators';
import { isNullOrUndefined } from 'util';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  // Constants for Ingredient Display
  static DEFAULT_PICTURE = 'defaultIngredient.jpg';

  // Ingredient displayed by component
  ingredient: Ingredient;

  // Categories to display for this ingredient
  categories: Array<Categorie> = [];

  // This boolean indicates if we can edit Ingredient or not.
  isEditable = false;

  // This boolean indicates if this ingredient is composed of other ones.
  isComplexIngredient = false;

  // DEBUG MODE
  debugMode = true;

  constructor(private ingredientService: IngredientService,
    private route: ActivatedRoute,
    private location: Location,
    private categoryService: CategoryService) {

    // Default mode : Creation mode
    this.isEditable = true;
    this.ingredient = new Ingredient();

    this.route.params.subscribe(params => {

      // If an ingredient ID is provided -> read only mode
      if (params.hasOwnProperty('id')) {
        const idRequested: number = +params['id'];
        this.ingredientService.getById(idRequested).subscribe(
          (ingredient: Ingredient) => {
            this.ingredient = ingredient;
            this.isEditable = false;

            if (isNullOrUndefined(this.ingredient.urlImage) || this.ingredient.urlImage.length === 0) {
              this.ingredient.urlImage = IngredientComponent.DEFAULT_PICTURE;
            }
          }
        );
      }

      this.initCategoriesList();
    }
    );
  }

  ngOnInit() {

    // This command allow to get name of real class
    switch (this.ingredient.constructor.name) {
      case Recipe.name:
        this.isComplexIngredient = true;
        if (this.debugMode) {
          console.log('this.ingredient is a recipe');
        }
        break;
      case Ingredient.name:
        this.isComplexIngredient = false;
        if (this.debugMode) {
          console.log('this.ingredient is a basic ingredient');
        }
        break;
      case Meal.name:
        this.isComplexIngredient = true;
        if (this.debugMode) {
          console.log('this.ingredient is a meal');
        }
        break;
    }
  }

  setCategoryFromSelector(e: MatSelectChange) {
    const categoryId: number = +e.value;
    this.ingredient.categorie = this.categoryService.getCategoryById(categoryId);
  }

  saveEditableIngredient(e: Event) {
    if (this.debugMode) {
      console.log('save ingredient');
      console.log(this.ingredient);
    }
    // TODO CALL to IngredientService.save()
    e.preventDefault();
  }

  cancelIngredientEdition(e: Event) {
    // CallBack
    this.close(e);
  }

  close(e: Event) {
    if (this.debugMode) {
      console.log('this.location.back');
    }
    e.preventDefault();
    this.location.back();
  }

  /*
  ONLY DEBUG FUNCTION BELOW THIS LINE
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
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

}

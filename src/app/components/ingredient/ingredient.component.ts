import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Ingredient} from '../../models/ingredient.model';
import {IngredientService} from '../../services/ingredient.service';
import {Recipe} from '../../models/recipe.model';
import {Meal} from '../../models/meal.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSlideToggleChange, MatSelectChange} from '@angular/material';
import {Categorie} from '../../models/categorie.model';
import {CategoryService} from '../../services/category.service';
import {isNullOrUndefined} from 'util';
import {Location} from '@angular/common';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  // Constants for Ingredient Display
  static DEFAULT_PICTURE = 'defaultIngredient.jpg';

  // Direct route for creation mode
  static DIRECT_ROUTE_FOR_INGREDIENT_COMPONENT = 'ingredient';

  // Ingredient displayed by component
  public ingredient: Ingredient;

  @Output() eventToClose = new EventEmitter();

  // Categories to display for this ingredient
  categories: Array<Categorie> = [];

  // This boolean indicates if we can edit Ingredient or not.
  isEditable = false;

  // This boolean indicates if this ingredient is composed of other ones.
  isComplexIngredient = false;

  // This boolean indicates if this component is integrated or not
  isComponentIntegrated = false;

  // This variable content error message to display to the user in case of data base error.
  dbErrorMessage: string;

  // DEBUG MODE
  debugMode = false;

  constructor(private ingredientService: IngredientService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private categoryService: CategoryService) {

    // This component is integrated if URL doesn't include DIRECT_ROUTE_FOR_INGREDIENT_COMPONENT
    this.isComponentIntegrated = !(router.url.includes(IngredientComponent.DIRECT_ROUTE_FOR_INGREDIENT_COMPONENT));

    // Default mode : Creation mode by default if this route contains DIRECT_ROUTE_CREATION_MODE
    this.isEditable = (router.url.includes(IngredientComponent.DIRECT_ROUTE_FOR_INGREDIENT_COMPONENT));

    this.ingredient = new Ingredient();
    this.ingredient.urlImage = IngredientComponent.DEFAULT_PICTURE;

    this.dbErrorMessage = '';
    this.initCategoriesList();

    // ingredient will retrieve ingredientToDisplay sent by ingredientService
    this.ingredientService.ingredientToDisplay.subscribe(
      (ingredientToDisplay: Ingredient) => {
        this.ingredient = ingredientToDisplay;
        this.isEditable = false;
        if (isNullOrUndefined(this.ingredient.urlImage) || this.ingredient.urlImage.length === 0) {
          this.ingredient.urlImage = IngredientComponent.DEFAULT_PICTURE;
        }
      }
    );

    this.route.params.subscribe(params => {
      // If an ingredient ID is provided
      if (params.hasOwnProperty('id')) {
        const idRequested: number = +params['id'];
        // -> Loading of the ingredient to display using  ingredient id.
        this.ingredientService.setIngredientToDisplayById(idRequested);
      }
    });

  }

  public updateGlycemicLoad() {
    if (this.ingredient.glucid && this.ingredient.glycemicIndex) {
      this.ingredient.glycemicLoad = this.ingredientService.calculateGlycemicLoad(
        this.ingredient.glycemicIndex,
        this.ingredient.glucid
      );
    }
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
    this.categoryService.getCategoryById(categoryId).subscribe(
      (cat) => {
        this.ingredient.category = cat;
      }
    );
  }

  /**
   * This method is called to save current ingredient in database
   * @param e : event of button calling this method
   */
  saveEditableIngredient() {
    if (this.debugMode) {
      console.log('save ingredient');
      console.log(this.ingredient);
    }

    if (this.ingredient.id) {
      this.ingredientService.update(this.ingredient).subscribe(
        (ingredient: Ingredient) => {
          this.ingredient = ingredient;
          this.dbErrorMessage = '';
        },
        (error: Error) => {
          this.dbErrorMessage = error.message;
          console.log('Update error');
        }
      );
    } else {
      this.ingredientService.create(this.ingredient).subscribe(
        (ingredient: Ingredient) => {
          this.ingredient = ingredient;
          this.dbErrorMessage = '';
        },
        (error: Error) => this.dbErrorMessage = error.message
      );

    }
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
    if (this.router.url !== '/food') {
      this.location.back();
    } else {
      console.log('clôture');
      this.eventToClose.next(true);
    }
  }

  /*
  ONLY DEBUG FUNCTION BELOW THIS LINE
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
  toggleEditSlide(e: MatSlideToggleChange) {
    console.log(e);
    this.isEditable = e.checked;
  }

  initCategoriesList() {
    this.categoryService.getCategories().subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
        if (this.ingredient.category) {
          console.log(this.ingredient.category.name);
        }

      }
    );
  }

  checkIngredient(e: Event) {
    console.log(this.ingredient);
    e.preventDefault();
  }

}

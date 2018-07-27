import { Injectable } from '@angular/core';
import { Meal } from '../models/meal.model';
import { RecipeIngredient } from '../models/recipe-ingredient.model';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private mealList: Meal[];

  constructor(private ingredientService: IngredientService) {
    this.mealList = new Array<Meal>();
    for (let i = 1; i < 10; i++) {
      this.mealList.push(this.createFakeMeal(i, i));
    }
  }

  public getAll(): Meal[] {
    return this.mealList;
  }


  public getById(id: number): Meal {
    if (id < this.mealList.length) {
      return this.mealList[id - 1];
    } else {
      return null;
    }
  }

  private createFakeMeal(id: number, numIngredients: number): Meal {
    const fakeMeal = new Meal();
    fakeMeal.id = id;
    fakeMeal.name = 'Repas N° ' + id;
    fakeMeal.comment = 'ceci est le repas n° ' + id;
    fakeMeal.energy = 0.0;
    fakeMeal.water = 0.0;
    fakeMeal.protein = 0.0;
    fakeMeal.glucid = 0.0;
    fakeMeal.lipid = 0.0;
    fakeMeal.sugar = 0.0;
    fakeMeal.amidon = 0.0;
    fakeMeal.fiber = 0.0;
    fakeMeal.unsaturedFattyAcides = 0.0;
    fakeMeal.monoUnsaturedFattyAcides = 0.0;
    fakeMeal.polyUnsaturedFattyAcides = 0.0;
    fakeMeal.salt = 0.0;

    // create ingredients list
    const listIngredient: RecipeIngredient[] = new Array<RecipeIngredient>();
    for (let i = 1; i <= numIngredients; i++) {
      const recipeIngredient: RecipeIngredient = new RecipeIngredient();
      this.ingredientService.getById(i).subscribe(
        (ingredient: Ingredient) => {
          recipeIngredient.ingredient = ingredient;
          recipeIngredient.quantity = 100.0 * i;
          listIngredient.push(recipeIngredient);
        },
        (error) => {
          console.log('ingredient ' + i + 'unknown in database');
        }

      );

    }
    fakeMeal.listOfIngredients = listIngredient;

    return fakeMeal;

  }


}


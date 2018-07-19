import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeIngredient } from './../models/recipe-ingredient.model';
import { IngredientService } from './ingredient.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  static readonly URL_RECIPE = environment.backEndUrl + '/recipes';

  // private recipeList: Recipe[];  // n'est plus utilisé

  constructor(private http: HttpClient, private ingredientService: IngredientService) {
    // this.getAll().subscribe( (returnedRecipeList: Recipe[]) => { this.recipeList = returnedRecipeList; } ); // n'est plus nécéssaire
  }


  public getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      RecipeService.URL_RECIPE + (localStorage.userId ? '?userId=' + localStorage.userId : '')
    );
  }


  // method to load a recipe by id
  public getById(id: number): Observable<Recipe> {
    if (localStorage.userId) {
      return this.http.get<Recipe>(RecipeService.URL_RECIPE + '/' + id, {
        params: new HttpParams()
          .set('userId', localStorage.userId)
      }
      );
    } else {
      return this.http.get<Recipe>(RecipeService.URL_RECIPE + '/' + id);
    }
  }

  public getNew(): Recipe {
    const newRecipe = new Recipe();
    newRecipe.id = 0;
    newRecipe.listOfIngredients = null;
    newRecipe.name = '(Nouvelle préparation)';
    return newRecipe;
  }

  public DeleteRecipeIngredient(recipe: Recipe, ingredientToDelete: RecipeIngredient): Recipe {
    recipe.listOfIngredients = recipe.listOfIngredients.filter(ingredientItem => ingredientItem !== ingredientToDelete);
    return recipe;
  }

  public DeleteRecipeAllIngredients(recipe: Recipe): Recipe {
    recipe.listOfIngredients = new Array<RecipeIngredient>();
    return recipe;
  }


 // n'est plus nécéssaire
//   private createFakeRecipe(id: number, numIngredients: number): Recipe {
//     const fakeRecipe = new Recipe();
//     fakeRecipe.id = 100 + id;
//     fakeRecipe.name = 'Recette N° ' + fakeRecipe.id;
//     fakeRecipe.comment = 'ceci est la recette n° ' + fakeRecipe.id;
//     fakeRecipe.energy = 0.0;
//     fakeRecipe.water = 0.0;
//     fakeRecipe.protein = 0.0;
//     fakeRecipe.glucid = 0.0;
//     fakeRecipe.lipid = 0.0;
//     fakeRecipe.sugar = 0.0;
//     fakeRecipe.amidon = 0.0;
//     fakeRecipe.fiber = 0.0;
//     fakeRecipe.unsaturedFattyAcides = 0.0;
//     fakeRecipe.monoUnsaturedFattyAcides = 0.0;
//     fakeRecipe.polyUnsaturedFattyAcides = 0.0;
//     fakeRecipe.salt = 0.0;

//     // create ingredients list
//     const listIngredient: RecipeIngredient[] = new Array<RecipeIngredient>();
//     for (let i = 1; i <= numIngredients; i++) {
//       const recipeIngredient: RecipeIngredient = new RecipeIngredient();
//       // recipeIngredient.recipe = fakeRecipe;
//       // recipeIngredient.ingredient = this.ingredientService.getById(i);
//       /*
//       this.ingredientService.getById(i).subscribe(
//         (ingredient: Ingredient) => {
//           recipeIngredient.ingredient = ingredient;
//           recipeIngredient.quantity = 100.0 * i;
//           listIngredient.push(recipeIngredient);
//         },
//         (error) => { } // What do you want to do John Snow.... Nothing ?!
//       );
// */
//     }
//     fakeRecipe.listOfIngredients = listIngredient;

//     return fakeRecipe;

//   }


/**
   * Create a recipe in database
   * @param recipe : ingredient to create
   */
  public create(recipe: Recipe): Observable<Recipe> {

    recipe.id = null; // new recipe dont have id for backend

    console.log('recipeService : create : recipe = ', recipe);
    // A recipet can't be created by anonymous user.
    if (!localStorage.userId) {
      return throwError(new Error('Unknown user'));
    }

    return this.http.post<Recipe>(
      RecipeService.URL_RECIPE + '?userId=' + localStorage.userId,
      recipe
    );

  }

  /**
   * Update an existing recipe in database
   * @param recipe : existing recipe to update in database
   */
  public update(recipe: Recipe): Observable<Recipe> {

    // An recipe can't be update by anonymous user.
    if (!localStorage.userId) {
      return throwError(new Error('Unknown user'));
    }

    // An ingredient can't be updated if it has no ID
    if (!recipe.id) {
      return throwError(new Error('An update can\'t be performed without an id'));
    }

    return this.http.put<Recipe>(
      RecipeService.URL_RECIPE + '/' + recipe.id + '?userId=' + localStorage.userId,
      recipe
    );
  }
}

import { RecipeComponent } from './../components/recipe/recipe.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeIngredient } from './../models/recipe-ingredient.model';
import { IngredientService } from './ingredient.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { Observable, throwError } from '../../../node_modules/rxjs';
import { environment } from 'src/environments/environment';
import { Categorie } from 'src/app/models/categorie.model';


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




  /**
   * Create a recipe in database
   * @param preparation : preparation to save as a recipe
   * @param recipeName : name for the new recipe
   * @param recipeComment : comment for the new recipe
   * @param category : category for the new recipe
   *
   */
  public create(preparation: Recipe, recipeName: string, recipeComment: string, category: Categorie): Observable<Recipe> {

    // clone preparation as a new recipe object so preparation will not be affected by change
    const recipe: Recipe = (JSON.parse(JSON.stringify(preparation)));

    // set new recipe attributes
    recipe.id = null; // delete recipe id because new recipe needs not have id for backend to save it
    recipe.name = recipeName; // set recipe name
    recipe.comment = recipeComment; // set recipe comment
    recipe.category = category; // set recipe category
    recipe.glycemicIndex = 0;
    recipe.glycemicLoad = 0;

    console.log('recipeService : create : recipe = ', recipe);


    // A recipe can't be created by anonymous user.
    if (!localStorage.userId) {
      return throwError(new Error('Unknown user'));
    }

    // call back end REST service to create the new recipe and return the result as observable
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

    // A recipe can't be updated if it has no ID
    if (!recipe.id) {
      return throwError(new Error('An update can\'t be performed without an id'));
    }

    return this.http.put<Recipe>(
      RecipeService.URL_RECIPE + '/' + recipe.id + '?userId=' + localStorage.userId,
      recipe
    );
  }




  /**
   * Delete a recipe in database
  * @param recipe : existing recipe to update in database
    */
  public delete(recipe: Recipe): Observable<string> {

    console.log('recipeService : delete : recipe = ', recipe);


    // A recipe can't be deleted by anonymous user.
    if (!localStorage.userId) {
      return throwError(new Error('Unknown user'));
    }

    // call back end REST service to delete the recipe and return the result as observable
    return this.http.delete<string>(
      RecipeService.URL_RECIPE + '/' + recipe.id + '?userId=' + localStorage.userId);

  }


}

import { Ingredient } from 'src/app/models/ingredient.model';
import { CategoryService } from './category.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  static readonly URL_INGREDIENT = environment.backEndUrl + '/ingredients';

  constructor(private http: HttpClient, private categoryService: CategoryService) { }

  public getGlobalList(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(IngredientService.URL_INGREDIENT + '?userId=' + localStorage.userId);
  }

  public getListIngredientsByCategoryId(catId: number): Observable<Ingredient[]> {
    // return this.ingredientsList.filter(e => e.categorie.id === catId);
    return this.http.get<Ingredient[]>(IngredientService.URL_INGREDIENT + '/category/' + catId + '?userId=' + localStorage.userId);
  }

  public getById(id: number): Observable<Ingredient> {

    if (localStorage.userId) {
      return this.http.get<Ingredient>(
        IngredientService.URL_INGREDIENT + '/' + id,
        {
          params: new HttpParams()
            .set('userId', localStorage.userId)
        });
    }

    return this.http.get<Ingredient>(
      IngredientService.URL_INGREDIENT + '/' + id, );
  }

  /**
   * Create an ingredient in database
   * @param ingredient : ingredient to create
   */
  public create(ingredient: Ingredient): Observable<Ingredient> {

    // An ingredient can't be created by anonymous user.
    if (!localStorage.userId) {
      return throwError(new Error('Unknown user'));
    }

    console.log('Before Http post Ingredient creation, userId: ' + localStorage.userId);

    return this.http.post<Ingredient>(
      IngredientService.URL_INGREDIENT + '?userId=' + localStorage.userId,
      ingredient
    );

  }

  /**
   * Update an existing ingredient in database
   * @param ingredient : existing ingredient to update in database
   */
  public update(ingredient: Ingredient): Observable<Ingredient> {

    // An ingredient can't be update by anonymous user.
    if (!localStorage.userId) {
      return throwError(new Error('Unknown user'));
    }

    // An ingredient can't be updated if it has no ID
    if (!ingredient.id) {
      return throwError(new Error('An update can\'t be performed without an id'));
    }

    return this.http.put<Ingredient>(
      IngredientService.URL_INGREDIENT + '/' + ingredient.id + '?userId=' + localStorage.userId,
      ingredient
      /* {
        params: new HttpParams()
          .set('userId', localStorage.userId)
      }*/
    );
  }


  public calculateGlycemicLoad(glycemicIndex: number, glucidQuantityPerPortion: number): number {
    // CG = [IG x quantité de glucides d’une portion d’aliment (g)]/100
    if (!glycemicIndex || !glucidQuantityPerPortion) {
      return null;
    }
    return Math.round(glycemicIndex * glucidQuantityPerPortion) / 100;
  }


  /********************* ELEMENTS TO TEST FRONT COMPONENT **********************/


  // tslint:disable-next-line:member-ordering
  static systemUser: User = new User(1, '', 'System', '');

}

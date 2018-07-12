import { Ingredient } from 'src/app/models/ingredient.model';
import { CategoryService } from './category.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  static readonly URL_INGREDIENT = 'http://localhost:8095/ingredients';

  // private _ingredientsList: Ingredient[];

  constructor(private http: HttpClient, private categoryService: CategoryService) { }

  public getGlobalList(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(IngredientService.URL_INGREDIENT + '?userId=0');
  }

  public getListIngredientsByCategoryId(catId: number): Observable<Ingredient[]> {
    // return this.ingredientsList.filter(e => e.categorie.id === catId);
    return this.http.get<Ingredient[]>(IngredientService.URL_INGREDIENT + '/category/' + catId + '?userId=0');
  }


  // getters & setters
  /*public get ingredientsList(): Ingredient[] {
    return this._ingredientsList;
  }
  public set ingredientsList(value: Ingredient[]) {
    this._ingredientsList = value;
  }*/

  public getById(id: number): Observable<Ingredient> {

    if (localStorage.userId && localStorage.userId !== 'null') {
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
    if (!localStorage.userId || localStorage.userId === 'null') {
      return throwError(new Error('Unknown user'));
    }

    return this.http.post<Ingredient>(
      IngredientService.URL_INGREDIENT + '/userId=' + localStorage.userId
      , {
        header: new HttpHeaders().set('Allow', 'POST'),
        ingredient
      });

  }

  /**
   * Update an existing ingredient in database
   * @param ingredient : existing ingredient to update in database
   */
  public update(ingredient: Ingredient): Observable<Ingredient> {

    // An ingredient can't be update by anonymous user.
    if (!localStorage.userId || localStorage.userId === 'null') {
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
  /*
    private getTomate(): Ingredient {
      return new Ingredient(
        1,
        'Tomates',
        'tomates.jpg', 100, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        this.categoryService.getCategoryById(4),
        IngredientService.systemUser,
        'ceci est un commentaire');
    }

    private getCarotte(): Ingredient {
      return new Ingredient(
        2,
        'Carotte',
        'carottes.jpg', 200, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        this.categoryService.getCategoryById(4),
        IngredientService.systemUser,
        'ceci est un commentaire');
    }

    private getPoelee(): Ingredient {
      return new Ingredient(
        3,
        'Poêlée de pommes de terre préfrites, lardons ou poulet, et autres, sans légumes verts',
        'poelee.jpg', 200, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        this.categoryService.getCategoryById(8),
        IngredientService.systemUser,
        'ceci est un commentaire');
    }

    private getPoireau(): Ingredient {
      return new Ingredient(
        4,
        'Poireau',
        'poireau.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        this.categoryService.getCategoryById(4),
        IngredientService.systemUser,
        'ceci est un commentaire');
    }

    private getUnknown(): Ingredient {
      return new Ingredient(
        102,
        'FAKE RECIPE',
        'defaultIngredient.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        this.categoryService.getCategoryById(9),
        IngredientService.systemUser,
        'ceci est ingredient inconu');
    }
  */


}

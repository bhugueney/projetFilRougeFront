import { CategoryService } from './category.service';
import { Ingredient } from './../models/ingredient.model';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  static readonly URL_GET_BY_ID = 'http://localhost:8095/ingredients?userId=0';
  static readonly restItemsUrl = 'http://localhost:8095/ingredients?userId=0';

  private _ingredientsList: Ingredient[];

  constructor(private http: HttpClient, private categoryService: CategoryService) {}

  public getGlobalList(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(IngredientService.URL_GET_BY_ID);
  }

  public getListByCategoryId(catId) {
    return this.ingredientsList.filter(e => e.categorie.id === catId);
  }


  // getters & setters
  public get ingredientsList(): Ingredient[] {
    return this._ingredientsList;
  }
  public set ingredientsList(value: Ingredient[]) {
    this._ingredientsList = value;
  }

  public getById(id: number): Observable<Ingredient> {
    const userId = (localStorage.userId ? localStorage.userId : '0');
    return this.http.get<Ingredient>(
      IngredientService.URL_GET_BY_ID + '/' + id,
      {
        params: new HttpParams()
        .set('userId', userId)
      });
    }

    /********************* ELEMENTS TO TEST FRONT COMPONENT **********************/

    // tslint:disable-next-line:member-ordering
    static systemUser: User = new User(1, '', 'System', '');

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



          }

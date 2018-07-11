import { CategoryService } from './category.service';
import { Ingredient } from './../models/ingredient.model';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Categorie } from '../models/categorie.model';

import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  static readonly URL_GET_BY_ID = 'http://localhost:8095/ingredients';
  static readonly restItemsUrl = 'http://localhost:8095/ingredients?userId=0';

  restItems: any;
  private _ingredientsList: Ingredient[];

  // Mise en place d'un objet Subject(qui peut etre observable et observer)de modification sur la liste ingredients
  private updateList = new Subject<Ingredient[]>();

  // flux d'annonce sur lequel on peut suivre les modifications apportées à l'objet Subject
  public ingredientsListRead = this.updateList.asObservable();

  constructor(private http: HttpClient, private categoryService: CategoryService) {
    // this.loadIngredientsFromDatabase();
  }

  public getGlobalList() {
    // this.ingredientsList = new Array<Ingredient>();
    this.ingredientsList = new Array<Ingredient>();
    this.ingredientsList.push(this.getCarotte());
    this.ingredientsList.push(this.getPoelee());
    this.ingredientsList.push(this.getPoireau());
    this.ingredientsList.push(this.getTomate());
    return this.ingredientsList;
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

  // Read all REST Items
  loadIngredientsFromDatabase(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.ingredientsList = restItems;
          this.updateList.next(this.ingredientsList); // permet de prevenir les autres composants de la mise à jour
          console.log(this.ingredientsList);
        }
      );
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(IngredientService.restItemsUrl)
      .pipe(map(data => data));
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

  static systemUser: User = new User(1, '', 'System', '');

  /*public getById(id: number): Ingredient {
    let retIngredient: Ingredient;
    switch (id) {
      case 2: { retIngredient = this.getCarotte(); break; }
      case 1: { retIngredient = this.getTomate(); break; }
      case 3: { retIngredient = this.getPoelee(); break; }
      case 4: { retIngredient = this.getPoireau(); break; }
      default: { retIngredient = this.getUnknown(); break; }
    }
    return retIngredient;
  }*/

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
      0,
      'Inconnu',
      'defaultIngredient.jpg', 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      this.categoryService.getCategoryById(9),
      IngredientService.systemUser,
      'ceci est ingredient inconu');
  }



}

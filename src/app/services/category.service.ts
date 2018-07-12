import { Categorie } from './../models/categorie.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly URL_GET_BY_ID = 'http://localhost:8095/categories';

  private categories: Array<Categorie> = [];

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.URL_GET_BY_ID);
  }

  public getSelectableCategories(): Array<Categorie> {
    return this.categories;
  }

  public getChildrenCategoryByIdParent(id: number): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.URL_GET_BY_ID + '/children/' + id);
  }

  public getCategoryById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(this.URL_GET_BY_ID + '/' + id);
  }

}

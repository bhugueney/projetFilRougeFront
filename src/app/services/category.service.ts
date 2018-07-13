import { Categorie } from './../models/categorie.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly URL_CATEGORIE = environment.backEndUrl + '/categories';

  private categories: Array<Categorie> = [];

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.URL_CATEGORIE);
  }

  public getSelectableCategories(): Array<Categorie> {
    return this.categories;
  }

  public getChildrenCategoryByIdParent(id: number): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.URL_CATEGORIE + '/children/' + id);
  }

  public getCategoryById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(this.URL_CATEGORIE + '/' + id);
  }

}

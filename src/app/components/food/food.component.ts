import { RecipeService } from './../../services/recipe.service';
import { PreparationService } from './../../services/preparation.service';
import { Location } from '@angular/common';
import { CategoryService } from './../../services/category.service';
import { IngredientService } from './../../services/ingredient.service';
import { Ingredient } from './../../models/ingredient.model';
import { Categorie } from './../../models/categorie.model';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '../../../../node_modules/@angular/forms';
import { Observable } from '../../../../node_modules/rxjs';
import { startWith, map } from '../../../../node_modules/rxjs/operators';
import { Recipe } from '../../models/recipe.model';
import { HttpErrorResponse } from '../../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  // create of form control
  mySearch = new FormControl;
  // create of observable for the form control
  filteredIngredients: Observable<Ingredient[]>;
  // list of ingredients filtered
  filteredList = new Array<Ingredient>();
  // list of ingredients to display
  private _ingredients = new Array<Ingredient>();
  // list of categories level 1
  private _listCategories: Categorie[];
  // filters
  private _filters = ['categories', 'liste globale'];
  // filter selected
  private _filterSelected = 'categories';
  // list of ingredients selected
  private _selectedIngredients: Ingredient[];
  // link to navigate on display ingredient since simple ingredient or complexe ingredient (recipe)
  private _routerLink: string;

  constructor(private location: Location, private recipeService: RecipeService,
    private route: Router, private ingredientService: IngredientService, private categoryService: CategoryService,
    private preparationService: PreparationService) {
      this.selectedIngredients = new Array<Ingredient>();
    }

    // initialisation de la liste globale d'ingredient
    // initialisation des catégories niveau 1
    // chargement de la liste d'ingrédients sélectionnés
    ngOnInit() {
      this.getGlobalListIngredients();
      this.getMainCategories();
      this.selectedIngredients = this.preparationService.ingredientsList;
      // initialisation de la méthode de filtre pour l'autocompletion
      this.filteredIngredients = this.mySearch.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterSearch(value))
      );
      this.filteredIngredients.subscribe(
        (list) => { this.filteredList = list; }
      );
    }

    // mise en place du filtre de l'autocompletion
    private filterSearch(value: string): Ingredient[] {
      if (value) { this.filterSelected = ''; } else { this.filterSelected = 'categories'; }
      const filterValue = value.toLowerCase();
      console.log('==> ', { filterValue });
      return this.ingredients.filter(ing => ing.name.toLowerCase().includes(filterValue));
    }

    // method to load the globale list
    public getGlobalListIngredients() {
      this.ingredientService.getGlobalList().subscribe(
        (list) => {
          this.ingredients = list;
          list.forEach(e => {
            if (e.urlImage === null) { e.urlImage = 'defaultIngredient.jpg'; }
          });
        }
      );
    }

    // method to load categories level 1
    public getMainCategories() {
      this.categoryService.getCategories().subscribe(
        (list) => {
          this.listCategories = (list.filter(e => e.parent === null));
          console.log(this.listCategories);
        }
      );
    }

    // control d'ingredient en cours de préparation ou non
    control(id: number): boolean {
      return this.selectedIngredients.filter(e => e.id === id).length > 0;
    }

    // method de selection de filtre
    public setFilterFromSelector(e: MatSelectChange) {
      this.filterSelected = e.value;
      if (this.filterSelected === 'liste globale') {
        this.filteredList = this.ingredients;
      }
      if (this.filterSelected === 'categories') {
        this.getMainCategories();
      }
    }

    // method de selection de category
    public selectedCategory(id: number, e: Event) {
      e.preventDefault();
      this.categoryService.getChildrenCategoryByIdParent(id).subscribe(
        (list) => {
          this.listCategories = list;
        },
        (error: HttpErrorResponse) => {
          console.log('No more categories');
          if (error.status === 404) {
            this.filterSelected = '';
            this.filteredList = [];
            this.ingredientService.getListIngredientsByCategoryId(id).subscribe(
              (list) => {
                list.forEach(el => {
                  if (el.urlImage === null) { el.urlImage = 'defaultIngredient.jpg'; }
                });
                this.filteredList = list;
              }
            );
          }
        }
      );
    }

    // method pour ajouter ou supprimer un aliment
    public moveIngredientInPreparationList(ing: Ingredient) {
      const indexIngredient = this.selectedIngredients.findIndex((e) => e.id === ing.id);
      if (this.control(ing.id)) {
        this.selectedIngredients.splice(indexIngredient, 1);
      } else {
        this.selectedIngredients.push(ing);
      }
      this.preparationService.ingredientsList = this.selectedIngredients;
    }

    // method pour envoyer la liste d'ingrédients selectionnés à la préparation
    public loadListIngredients(list: Ingredient[]) {
      this.preparationService.ingredientsList = list;
    }

    // method pour afficher un ingredient en fonction d'un ingredient simple ou complexe (recipe)
    public displayIngredient(id: number) {
      this.recipeService.getById(id).subscribe(
        (ingredient: Recipe) => {
          // A recipe is found for this ingredient
          this.route.navigateByUrl('/preparation/' + id);
        },
        (error: Error) => {
          console.log('Recipe not found');
          this.route.navigateByUrl('/ingredient/' + id);
        }
      );
    }

    // method de retour arriere sur les écrans
    public rollBack(e: Event) {
      e.preventDefault();
      this.location.back();
    }

    // method to search by autocompletion
    public search(search: string) {

    }

    // Getters and setters
    public get ingredients(): Ingredient[] {
      return this._ingredients;
    }
    public set ingredients(value: Ingredient[]) {
      this._ingredients = value;
    }

    public get listCategories(): Categorie[] {
      return this._listCategories;
    }
    public set listCategories(value: Categorie[]) {
      this._listCategories = value;
    }

    public get filters(): string[] {
      return this._filters;
    }
    public set filters(value: string[]) {
      this._filters = value;
    }

    public get filterSelected(): string {
      return this._filterSelected;
    }
    public set filterSelected(value: string) {
      this._filterSelected = value;
    }

    public get selectedIngredients(): Ingredient[] {
      return this._selectedIngredients;
    }
    public set selectedIngredients(value: Ingredient[]) {
      this._selectedIngredients = value;
    }

    public get routerLink(): string {
      return this._routerLink;
    }
    public set routerLink(value: string) {
      this._routerLink = value;
    }

  }

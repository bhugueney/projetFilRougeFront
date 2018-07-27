import { UserService } from './../../services/user.service';
import { DialogYesNoComponent } from './../dialog-yes-no/dialog-yes-no.component';
import { RecipeIngredient } from './../../models/recipe-ingredient.model';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { MatDialog, MatSelectChange } from '@angular/material';
import { PreparationDetailsComponent } from 'src/app/components/preparation-details/preparation-details.component';
import { PreparationService } from '../../services/preparation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveAsRecipeComponent } from 'src/app/components/preparation/save-as-recipe/save-as-recipe.component';
import { Meal } from 'src/app/models/meal.model';
import { Categorie } from 'src/app/models/categorie.model';
import { CategoryService } from 'src/app/services/category.service';
import { DialogOkComponent } from 'src/app/components/dialog-ok/dialog-ok.component';






@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css'],
  providers : [PreparationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreparationComponent implements OnInit {

  preparation: Meal = null;
  preparationType = '';
  showExpand: Boolean = false;
  isUserConnected: Boolean = false;

  // Categories to display for this ingredient
  categories: Array<Categorie> = [];


  constructor(private route: ActivatedRoute,
              private preparationService: PreparationService,
              private recipeService: RecipeService,
              private dialog: MatDialog,
              public router: Router,
              private userService: UserService,
              private categoryService: CategoryService,
              private changeDetectorRef: ChangeDetectorRef )  {

    // Set isUserConnected changes tracking
    this.userService.isUserConnected().subscribe( (userState) => { this.isUserConnected = userState; });

    // Set preparation statut changes tracking
    this.preparationService.getStatut().subscribe( (statut) => { this.refresh(); });

    // Set route changes tracking
    // at each change, get id from route param and call preparation service to find the preparation asked
    this.route.params.subscribe(
      (params) => {

          let idRequested: number;

          if (params.hasOwnProperty('id')) { idRequested = +params['id']; }
          // if (params.hasOwnProperty('mode')) { mode = params['mode']; }

          console.log('PreparationComponent route changed ! idRequested:', idRequested);
          // console.log('PreparationComponent mode:', mode);

          if (idRequested) {
            // if an id is requested then Call preparationService
            this.preparationService.findPreparationById(idRequested)
            .subscribe( (message) => {
              console.log('retour de preparationService.findPreparationById : ' + message);
              this.refresh();
            });
          } else {
            // no id requested
            if (this.preparationService.preparation === null) {
              // if no current preparation create a new one
              this.preparationService.doNewPreparation();
            } else {
              // if a current preparation exists just refresh
              this.refresh();
            }
          }
      }
    );

    this.refresh();
    this.initCategoriesList();
  }



  ngOnInit() {

  }

  public refresh(): void {
    this.preparation = this.preparationService.preparation;
    if (this.preparation) { console.log('Refresh : ' + typeof this.preparation); }
    this.preparationType = this.preparationService.preparationType;
    if (this.preparation) {this.preparation.dataCalcul(); }
    this.changeDetectorRef.markForCheck();

  }



  public deleteRecipeIngredient(recipeIngredient: RecipeIngredient) {
    this.recipeService.DeleteRecipeIngredient(this.preparation, recipeIngredient);
    this.preparation.dataCalcul();
  }

  public deleteRecipeAllIngredients() {
    const dialogRef = this.dialog.open(DialogYesNoComponent,
      {data: {title: 'Confirmation suppression', message: 'Etes-vous sûr de vouloir supprimer tous ces ingrédients ?'}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipeService.DeleteRecipeAllIngredients(this.preparation);
        this.preparation.dataCalcul();
      }
    });
  }


  public increaseQty(recipeIngredient: RecipeIngredient): void {
    console.log('Preparation Component IncreaseQty : this.preparation = ', this.preparation, this.preparation.constructor.name);
    recipeIngredient.quantity += 10;
    this.preparation.dataCalcul();
  }

  public decreaseQty(recipeIngredient: RecipeIngredient): void {
    recipeIngredient.quantity -= 10;
    if (recipeIngredient.quantity < 0.0) {
      recipeIngredient.quantity = 0.0;
    }
    this.preparation.dataCalcul();
  }


  public updateQty(recipeIngredient: RecipeIngredient, Qty: number) {
    recipeIngredient.quantity = +Qty;
    if (recipeIngredient.quantity < 0.0) {
      recipeIngredient.quantity = 0.0;
    }
    this.preparation.dataCalcul();
  }

  public showDetails(ingredientToShow: Meal) {
    const dialogRef = this.dialog.open(PreparationDetailsComponent, {
      height: '350px'
    });

    dialogRef.componentInstance.ingredientDetails = ingredientToShow;

  }

  public abandon() {
    let message: string;
    switch (this.preparationType) {
      case 'NEW PREPARATION': {message = 'Etes-vous sûr de vouloir abandonner l\'éditionde de cette nouvelle préparation ?'; break; }
      case 'RECIPE': {message = 'Etes-vous sûr de vouloir abandonner l\'édition de de cette recette ?'; break; }
      case 'MEAL': {message = 'Etes-vous sûr de vouloir abandonner l\'éditionde de ce repas ?'; break; }
      default: {message = 'Etes-vous sûr de vouloir abandonner cette préparation ?'; break; }
    }
    const dialogRef = this.dialog.open(DialogYesNoComponent,
      {data: {title: 'Confirmation abandon', message: message}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.preparationService.razPreparation();
        this.preparation = null;
        this.router.navigate(['/main']);
      }
    });
  }


  SaveAsRecipe() {
    if ( this.preparation.listOfIngredients.length > 0) {
      const dialogRef = this.dialog.open(SaveAsRecipeComponent,
        { data: {mode: 'SAVE'} });
    } else {
      const dialogRef = this.dialog.open(DialogOkComponent,
        {data: {title: 'Attention', message: 'L\'nregistrement d\'une recette sans ingrédients n\'est pas permis ! '}});
    }

  }

  EditRecipeInfos() {
    const dialogRef = this.dialog.open(SaveAsRecipeComponent,
      { data: {mode: 'EDIT', name: this.preparation.name, category: this.preparation.category, comment: this.preparation.comment} });
  }


  UpdateRecipe() {
    console.log('Preparation component : enter update recipe');
    this.preparationService.UpdateRecipe();
  }

  initCategoriesList() {
    this.categoryService.getCategories().subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      }
    );
  }

  setCategoryFromSelector(e: MatSelectChange) {
    const categoryId: number = +e.value;
    this.categoryService.getCategoryById(categoryId).subscribe(
      (cat) => {
        this.preparationService.preparation.category = cat;
        this.preparation.category = cat;
      }
    );
  }
}

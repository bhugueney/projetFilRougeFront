import { UserService } from './../../services/user.service';
import { DialogYesNoComponent } from './../dialog-yes-no/dialog-yes-no.component';
import { RecipeIngredient } from './../../models/recipe-ingredient.model';
import { Ingredient } from './../../models/ingredient.model';
import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { MatDialog } from '@angular/material';
import { PreparationDetailsComponent } from 'src/app/components/preparation-details/preparation-details.component';
import { PreparationService } from '../../services/preparation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Observable } from '../../../../node_modules/rxjs';
import { SaveAsRecipeComponent } from 'src/app/components/preparation/save-as-recipe/save-as-recipe.component';






@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css']
})
export class PreparationComponent implements OnInit, DoCheck {

  preparation: Recipe;
  showExpand: Boolean = false;
  isUserConnected: boolean;


  constructor(private route: ActivatedRoute,
              private preparationService: PreparationService,
              private recipeService: RecipeService,
              private dialog: MatDialog,
              public router: Router,
              private userService: UserService )  {

    // met en place le suivi de isUserConnected
    this.userService.isUserConnected().subscribe( (userState) => { this.isUserConnected = userState; });

    // this.route.params.subscribe(params => {

    //   let mode = '';
    //   let idRequested = 0;

    //   if (params.hasOwnProperty('mode')) { mode = params['mode']; }
    //   if (params.hasOwnProperty('id')) { idRequested = +params['id']; }

    //   });


    // ancien code
    const idRequested: number = +route.snapshot.paramMap.get('id');
    const isConsult = JSON.parse(route.snapshot.queryParamMap.get('consult') || 'false');
    console.log('PreparationComponent idRequested:', idRequested);
    console.log('PreparationComponent isConsult:', isConsult);

    this.preparationService.setPreparationById(idRequested);
  }


  ngDoCheck() {
    this.preparation = this.preparationService.preparation;
    console.log('preparation component : ngDoCheck : preparation = ', this.preparation);
    // if (this.preparation) { this.preparation.dataCalcul(); }
    this.showExpand = false;
  }

  ngOnInit() {
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

  public showDetails(ingredientToShow: Recipe) {
    const dialogRef = this.dialog.open(PreparationDetailsComponent, {
      height: '350px'
    });

    dialogRef.componentInstance.ingredientDetails = ingredientToShow;

  }

  public abandon() {
    const dialogRef = this.dialog.open(DialogYesNoComponent,
      {data: {title: 'Confirmation suppression', message: 'Etes-vous sûr de vouloir abandonner cette préparation ?'}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.preparationService.razPreparation();
        this.preparation = null;
        this.router.navigate(['/main']);
      }
    });
  }


  SaveAsRecipe() {
    const dialogRef = this.dialog.open(SaveAsRecipeComponent, {  });

  }
}

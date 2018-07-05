import { RecipeIngredient } from './../../models/recipe-ingredient.model';
import { Ingredient } from './../../models/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { MatDialog } from '@angular/material';
import { PreparationDetailsComponent } from 'src/app/components/preparation-details/preparation-details.component';
import { PreparationConfirmRazComponent } from 'src/app/components/preparation-confirm-raz/preparation-confirm-raz.component';
import {ActivatedRoute} from '@angular/router';
import { PreparationService } from '../../services/preparation.service';






@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css']
})
export class PreparationComponent implements OnInit {

  preparation: Recipe;
  showExpand: Boolean = false;
  razButtonEnabled: Boolean = true;

  constructor(private preparationService: PreparationService,
              private recipeService: RecipeService,
              private dialog: MatDialog,
              private route: ActivatedRoute)  {
    // this.route.params.subscribe(params => {
    //   // If an recipe ID is provided -> edit mode
    //   if (params.hasOwnProperty('id')) {
    //     const idRequested: number = +params['id'];
    //     this.preparation = this.recipeService.getById(idRequested);
    //   } else {
    //     // If no ingredient ID is provided -> creation mode
    //     this.preparation = this.recipeService.getNew();
    //   }
    // });
    this.preparation = this.preparationService.preparation;

  }

  ngOnInit() {
    this.preparation = this.preparationService.preparation;
    this.preparation.dataCalcul();
    this.showExpand = false;
  }

  public deleteRecipeIngredient(recipeIngredient: RecipeIngredient) {
    this.recipeService.DeleteRecipeIngredient(this.preparation, recipeIngredient);
    this.preparation.dataCalcul();
  }

  public deleteRecipeAllIngredients() {
    const dialogRef = this.dialog.open(PreparationConfirmRazComponent, {});

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

  public showDetails(ingredientToShow: Ingredient) {
    const dialogRef = this.dialog.open(PreparationDetailsComponent, {
      height: '350px'
    });

    dialogRef.componentInstance.ingredientDetails = ingredientToShow;

  }


}

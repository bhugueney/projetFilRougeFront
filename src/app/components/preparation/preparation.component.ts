import { UserService } from './../../services/user.service';
import { DialogYesNoComponent } from './../dialog-yes-no/dialog-yes-no.component';
import { RecipeIngredient } from './../../models/recipe-ingredient.model';
import { Ingredient } from './../../models/ingredient.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { MatDialog } from '@angular/material';
import { PreparationDetailsComponent } from 'src/app/components/preparation-details/preparation-details.component';
import { PreparationService } from '../../services/preparation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';






@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css']
})
export class PreparationComponent implements OnInit {

  preparation: Recipe;
  showExpand: Boolean = false;
  userIsConnected = false;


  constructor(private route: ActivatedRoute,
              private preparationService: PreparationService,
              private recipeService: RecipeService,
              private dialog: MatDialog,
              private router: Router,
              private userService: UserService )  {

    this.route.params.subscribe(params => {

      // If an ID is provided
      if (params.hasOwnProperty('id')) {
        const idRequested: number = + params['id'];
        // si on est deja en edition d'une preparation
        if (this.preparationService.preparation != null) {
          if (this.preparationService.preparation.id !== idRequested) {
            // const dialogRef = this.dialog.open(DialogOkComponent,
            //    { data : { title : 'Alerte !',
            //               message : 'Erreur une preparation n° ' + this.preparationService.preparation.id +
            // ' est déja en cours d\'édition !'
            //             }
            //     });
            alert('Erreur une preparation n° ' + this.preparationService.preparation.id + ' est déja en cours d\'édition !');
          }
        } else { // si on est pas en edition
          // si on demande une nouvelle preparation
          if (idRequested === 0) {
            this.preparationService.setNewPreparation();
            this.router.navigate(['/food']);
          } else {
            this.preparationService.preparation = this.recipeService.getById(idRequested);
          }
        }
      } else {
        // If no ID is provided -> edit mode
      }
    });
    this.preparation = this.preparationService.preparation;
    this.userIsConnected = userService.isUserConnected();
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

  public showDetails(ingredientToShow: Ingredient) {
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
        this.preparationService.preparation = null;
        this.preparation = null;
        this.router.navigate(['/main']);
      }
    });
  }

}

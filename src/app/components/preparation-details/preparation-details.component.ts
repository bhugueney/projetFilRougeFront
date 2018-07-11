import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-preparation-details',
  templateUrl: './preparation-details.component.html',
  styleUrls: ['./preparation-details.component.css']
})
export class PreparationDetailsComponent  {

  ingredientDetails: Ingredient;

  constructor(private ingredientService: IngredientService) {
    this.ingredientDetails = new Ingredient(); // ingredientService.getById(0);
   }

  public setIngredientDetails(ingredientToShow: Ingredient) {
    this.ingredientDetails = ingredientToShow;
  }


}

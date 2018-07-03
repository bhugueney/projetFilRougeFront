import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { IngredientService } from '../services/ingredient.service';

@Component({
  selector: 'app-preparation-details',
  templateUrl: './preparation-details.component.html',
  styleUrls: ['./preparation-details.component.css']
})
export class PreparationDetailsComponent  {

  ingredientDetails: Ingredient = this.ingredientService.getById(0);

  constructor(private ingredientService: IngredientService) {
    this.ingredientDetails = ingredientService.getById(0);
   }

  public setIngredientDetails(ingredientToShow: Ingredient) {
    this.ingredientDetails = ingredientToShow;
  }


}

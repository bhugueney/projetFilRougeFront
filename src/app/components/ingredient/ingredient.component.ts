import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  ingredient: Ingredient;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredient = this.ingredientService.getCarotte();
  }

}

import { Ingredient } from './../../models/ingredient.model';
import { PreparationService } from './../../services/preparation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preparation',
  templateUrl: './preparation.component.html',
  styleUrls: ['./preparation.component.css']
})
export class PreparationComponent implements OnInit {

  ingredients: Ingredient[];

  constructor(private preparationService: PreparationService) { }

  ngOnInit() {
    this.ingredients = this.preparationService.getListIngredients();
  }

}

import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientService } from '../../services/ingredient.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  ingredient: Ingredient;

   constructor(private ingredientService: IngredientService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.ingredientService.getById(params['id']));
   }

  ngOnInit() {
    this.ingredient = this.ingredientService.getById(1);
  }

}

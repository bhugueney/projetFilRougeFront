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
    this.route.params.subscribe( params => {
        const idRequested: number = +params['id'];
        this.ingredient = this.ingredientService.getById(idRequested);
      }
      );
   }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal.service';
import { PreparationService } from '../../services/preparation.service';
import { Meal } from '../../models/meal.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  mealList: Meal[];

  constructor(private mealService: MealService, private preparationService: PreparationService, private router: Router) {
      this.mealList = mealService.getAll();
   }

  ngOnInit() {
  }

  public get meal(): Meal {
    return this.mealService.getById(1);
  }

  public editMeal(meal: Meal) {
    this.preparationService.preparation = meal;
    this.router.navigate(['/preparation']);
  }
}

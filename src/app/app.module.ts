import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { FoodComponent } from './components/food/food.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { MealComponent } from './components/meal/meal.component';
import { PreparationComponent } from './components/preparation/preparation.component';
import { MenuComponent } from './components/menu/menu.component';
import { FoodService } from './services/food.service';
import { IngredientService } from './services/ingredient.service';
import { MealService } from './services/meal.service';
import { PreparationService } from './services/preparation.service';
import { RecipeService } from './services/recipe.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    IngredientComponent,
    RecipeComponent,
    MealComponent,
    PreparationComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [FoodService, IngredientService, MealService, PreparationService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

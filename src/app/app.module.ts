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
import { RecipeService } from './services/recipe.service';
import { CategoryService } from './services/category.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule,
   MatCardModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatSelectModule, MatTableModule,
    MatDialog, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PreparationDetailsComponent } from './preparation-details/preparation-details.component';




const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainMenuComponent},
  {path: 'recipe', component: RecipeComponent},
  {path: 'food', component: FoodComponent}
  {path: 'preparation', component: PreparationComponent},
  {path: 'ingredient/:id', component: IngredientComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    IngredientComponent,
    RecipeComponent,
    MealComponent,
    PreparationComponent,
    MenuComponent,
    MainMenuComponent,
    PageNotFoundComponent,
    PreparationDetailsComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
  ],
  providers: [FoodService, IngredientService, MealService, RecipeService, CategoryService],
  bootstrap: [AppComponent],
  entryComponents: [PreparationDetailsComponent]
})
export class AppModule { }

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
    MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { PreparationDetailsComponent } from 'src/app/components/preparation-details/preparation-details.component';
import { PreparationService } from './services/preparation.service';
import { DialogYesNoComponent } from './components/dialog-yes-no/dialog-yes-no.component';
import { DialogOkComponent } from './components/dialog-ok/dialog-ok.component';



import { HttpClientModule } from '@angular/common/http';




const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainMenuComponent},
  {path: 'recipe', component: RecipeComponent},
  {path: 'meal', component: MealComponent},
  {path: 'food', component: FoodComponent},
  {path: 'preparation', component: PreparationComponent},
  {path: 'preparation/:id', component: PreparationComponent},
  {path: 'ingredient', component: IngredientComponent},
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
    PreparationDetailsComponent,
    DialogYesNoComponent,
    DialogOkComponent
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
    HttpClientModule
  ],
  providers: [FoodService, IngredientService, MealService, RecipeService, CategoryService, PreparationService],
  bootstrap: [AppComponent],
  entryComponents: [DialogYesNoComponent, DialogOkComponent, PreparationDetailsComponent]
})
export class AppModule { }

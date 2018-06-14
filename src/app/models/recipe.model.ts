import { Ingredient } from './ingredient.model';
import { RecipeIngredient } from './recipe-ingredient.model';

export class Recipe extends Ingredient {
  // content of the recipe : since the Ingredient class
  private _listIngredient: RecipeIngredient[];

  public get listIngredient(): RecipeIngredient[] {
    return this._listIngredient;
  }

  public set listIngredient(value: RecipeIngredient[]) {
    this._listIngredient = value;
  }

  // method to cumulate data informations of every ingredient
  private dataCalcul() {
    this.listIngredient.forEach(
      recipeIngredient => {
        const element: Ingredient = recipeIngredient.ingredient;

        this.energy += element.energy;
        this.water += element.water;
        this.protein += element.protein;
        this.glucid += element.glucid;
        this.lipid += element.lipid;
        this.sugar += element.sugar;
        this.amidon += element.amidon;
        this.fiber += element.fiber;
        this.unsaturedFattyAcides += element.unsaturedFattyAcides;
        this.monoUnsaturedFattyAcides += element.monoUnsaturedFattyAcides;
        this.polyUnsaturedFattyAcides += element.polyUnsaturedFattyAcides;
        this.salt += element.salt;
      });
  }
}

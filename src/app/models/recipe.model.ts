import { Ingredient } from './ingredient.model';

export class Recipe extends Ingredient {
  // content of the recipe : since the Ingredient class
  private _listIngredient: Ingredient[];
  public get listIngredient(): Ingredient[] {
    return this._listIngredient;
  }
  public set listIngredient(value: Ingredient[]) {
    this._listIngredient = value;
  }

  // method to cumulate data informations of every ingredient
  private dataCalcul() {
    this.listIngredient.forEach(element => {
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

import { element } from 'protractor';
import { Ingredient } from './ingredient.model';
import { RecipeIngredient } from './recipe-ingredient.model';

export class Recipe extends Ingredient {

  // Total Recipe Informations

  // energy is specified in k/cal for total recipe
  public totalEnergy: number;

  // Attributes below are specified in g for total recipe
  public totalWater: number;
  public totalProtein: number;
  public totalGlucid: number;
  public totalLipid: number;
  public totalSugar: number;
  public totalAmidon: number;
  public totalFiber: number;
  public totalUnsaturedFattyAcides: number;
  public totalMonoUnsaturedFattyAcides: number;
  public totalPolyUnsaturedFattyAcides: number;
  public totalSalt: number;

  // Attributes below are specified indice for total recipe
  public totalGlycemicLoad: number;

  // content of the recipe : since the Ingredient class
  public listOfIngredients: RecipeIngredient[];






  // method to cumulate data informations of every ingredient
  public dataCalcul() {
    let totalWeight = 0;

    // console.log('-------- DATA CALCUL START -----------------');
    this.totalEnergy = 0.0;
    this.totalWater = 0.0;
    this.totalProtein = 0.0;
    this.totalGlucid = 0.0;
    this.totalLipid = 0.0;
    this.totalSugar = 0.0;
    this.totalAmidon = 0.0;
    this.totalFiber = 0.0;
    this.totalUnsaturedFattyAcides = 0.0;
    this.totalMonoUnsaturedFattyAcides = 0.0;
    this.totalPolyUnsaturedFattyAcides = 0.0;
    this.totalSalt = 0.0;
    this.totalGlycemicLoad = 0.0;

    if (this.listOfIngredients != null) {

      this.listOfIngredients.forEach(
        recipeIngredient => {
          // tslint:disable-next-line:no-shadowed-variable
          const element: Ingredient = recipeIngredient.ingredient;
          const qty: number = recipeIngredient.quantity;
          totalWeight += qty;

          // console.log('dataCacul : ingr ' + element.name + ' ' + (element.energy / 100.0) + ' Kcal' + ' * ' + qty + 'gr');
          this.totalEnergy += (element.energy / 100.0) * qty;
          this.totalWater += (element.water / 100.0) * qty;
          this.totalProtein += (element.protein / 100.0) * qty;
          this.totalGlucid += (element.glucid / 100.0) * qty;
          this.totalLipid += (element.lipid / 100.0) * qty;
          this.totalSugar += (element.sugar / 100.0) * qty;
          this.totalAmidon += (element.amidon / 100.0) * qty;
          this.totalFiber += (element.fiber / 100.0) * qty;
          this.totalUnsaturedFattyAcides += (element.unsaturedFattyAcides / 100.0) * qty;
          this.totalMonoUnsaturedFattyAcides += (element.monoUnsaturedFattyAcides / 100.0) * qty;
          this.totalPolyUnsaturedFattyAcides += (element.polyUnsaturedFattyAcides / 100.0) * qty;
          this.totalSalt += (element.salt / 100.0) * qty;
          this.totalGlycemicLoad += (Math.round((((element.glucid / 100.0) * qty) * element.glycemicIndex)) / 100);
        });
    }


    // Compute and store for portion of 100gr
    const portionRatio = totalWeight === 0 ? 1 : (totalWeight / 100);
    this.energy = this.totalEnergy / portionRatio;
    this.water = this.totalWater / portionRatio;
    this.protein = this.totalProtein / portionRatio;
    this.glucid = this.totalGlucid / portionRatio;
    this.lipid = this.totalLipid / portionRatio;
    this.sugar = this.totalSugar / portionRatio;
    this.amidon = this.totalAmidon / portionRatio;
    this.fiber = this.totalFiber / portionRatio;
    this.unsaturedFattyAcides = this.totalUnsaturedFattyAcides / portionRatio;
    this.monoUnsaturedFattyAcides = this.totalMonoUnsaturedFattyAcides / portionRatio;
    this.polyUnsaturedFattyAcides = this.totalPolyUnsaturedFattyAcides / portionRatio;
    this.salt = this.totalSalt / portionRatio;
    this.glycemicLoad = this.totalGlycemicLoad / portionRatio;


    // console.log('dataCalcul : Total energy ' + this.energy);
    // console.log('-------- DATA CALCUL END -----------------');
    // console.log('');
  }

}

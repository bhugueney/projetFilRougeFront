import { element } from 'protractor';
import { Ingredient } from './ingredient.model';
import { RecipeIngredient } from './recipe-ingredient.model';

export class Recipe extends Ingredient {

  // Total Recipe Informations

  // energy is specified in k/cal for total recipe
  private _totalEnergy: number;

  // Attributes below are specified in g for total recipe
  private _totalWater: number;
  private _totalProtein: number;
  private _totalGlucid: number;
  private _totalLipid: number;
  private _totalSugar: number;
  private _totalAmidon: number;
  private _totalFiber: number;
  private _totalUnsaturedFattyAcides: number;
  private _totalMonoUnsaturedFattyAcides: number;
  private _totalPolyUnsaturedFattyAcides: number;
  private _totalSalt: number;

  // Attributes below are specified indice for total recipe
  private _totalGlycemicLoad: number;

  // content of the recipe : since the Ingredient class
  private _listIngredient: RecipeIngredient[];


  public get totalEnergy(): number {
    return this._totalEnergy;
  }
  public set totalEnergy(value: number) {
    this._totalEnergy = value;
  }

  public get totalWater(): number {
    return this._totalWater;
  }
  public set totalWater(value: number) {
    this._totalWater = value;
  }
  public get totalProtein(): number {
    return this._totalProtein;
  }
  public set totalProtein(value: number) {
    this._totalProtein = value;
  }
  public get totalGlucid(): number {
    return this._totalGlucid;
  }
  public set totalGlucid(value: number) {
    this._totalGlucid = value;
  }
  public get totalLipid(): number {
    return this._totalLipid;
  }
  public set totalLipid(value: number) {
    this._totalLipid = value;
  }
  public get totalSugar(): number {
    return this._totalSugar;
  }
  public set totalSugar(value: number) {
    this._totalSugar = value;
  }
  public get totalAmidon(): number {
    return this._totalAmidon;
  }
  public set totalAmidon(value: number) {
    this._totalAmidon = value;
  }
  public get totalFiber(): number {
    return this._totalFiber;
  }
  public set totalFiber(value: number) {
    this._totalFiber = value;
  }
  public get totalUnsaturedFattyAcides(): number {
    return this._totalUnsaturedFattyAcides;
  }
  public set totalUnsaturedFattyAcides(value: number) {
    this._totalUnsaturedFattyAcides = value;
  }
  public gettotalMmonoUnsaturedFattyAcides(): number {
    return this._totalMonoUnsaturedFattyAcides;
  }
  public set totalMonoUnsaturedFattyAcides(value: number) {
    this._totalMonoUnsaturedFattyAcides = value;
  }
  public get totalPolyUnsaturedFattyAcides(): number {
    return this._totalPolyUnsaturedFattyAcides;
  }
  public set totalPolyUnsaturedFattyAcides(value: number) {
    this._totalPolyUnsaturedFattyAcides = value;
  }
  public get totalSalt(): number {
    return this._totalSalt;
  }
  public set totalSalt(value: number) {
    this._totalSalt = value;
  }

  public get totalGlycemicLoad(): number {
    return this._totalGlycemicLoad;
  }
  public set totalGlycemicLoad(value: number) {
    this._totalGlycemicLoad = value;
  }




  public get listIngredient(): RecipeIngredient[] {
    return this._listIngredient;
  }

  public set listIngredient(value: RecipeIngredient[]) {
    this._listIngredient = value;
  }

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

    if (this.listIngredient != null) {

      this.listIngredient.forEach(
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

import { User } from './user.model';
import { Categorie } from './categorie.model';
export class Ingredient {

  public id: number;
  public name: string;

  public urlImage = 'defaultIngredient.jpg';

  // energy is specified in k/cal for portion of 100g
  public energy: number;

  // Attributes below are specified in g for portion of 100g
  public water: number;
  public protein: number;
  public glucid: number;
  public lipid: number;
  public sugar: number;
  public amidon: number;
  public fiber: number;
  public unsaturedFattyAcides: number;
  public monoUnsaturedFattyAcides: number;
  public polyUnsaturedFattyAcides: number;
  public salt: number;

  // Attributes below are specified indice for portion of 100g
  public glycemicIndex: number;
  public glycemicLoad: number;

  public category: Categorie;

  // Creator of ingredient
  // public owner: User;

  // User comment
  public comment: string;

  constructor(
    id?: number,
    name?: string,
    urlImage?: string,
    energy?: number,
    water?: number,
    protein?: number,
    glucid?: number,
    lipid?: number,
    sugar?: number,
    amidon?: number,
    fiber?: number,
    unsaturedFattyAcides?: number,
    monoUnsaturedFattyAcides?: number,
    polyUnsaturedFattyAcides?: number,
    salt?: number,
    glycemicIndex?: number,
    glycemicLoad?: number,
    category?: Categorie,
    owner?: User,
    comment?: string
  ) {
    this.id = id;
    this.name = name;
    this.urlImage = urlImage;
    this.energy = energy;
    this.water = water;
    this.protein = protein;
    this.glucid = glucid;
    this.lipid = lipid;
    this.sugar = sugar;
    this.amidon = amidon;
    this.fiber = fiber;
    this.unsaturedFattyAcides = unsaturedFattyAcides;
    this.monoUnsaturedFattyAcides = monoUnsaturedFattyAcides;
    this.polyUnsaturedFattyAcides = polyUnsaturedFattyAcides;
    this.salt = salt;
    this.glycemicIndex = glycemicIndex;
    this.glycemicLoad = glycemicLoad;
    this.category = category;
    //  this.owner = owner;
    this.comment = comment;
  }

}

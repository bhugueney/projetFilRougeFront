import { User } from './user.model';
import { Categorie } from './categorie.model';
export class Ingredient {

  private _id: number;
  private _name: string;

  private _urlImage: string;

  // energy is specified in k/cal per 100g
  private _energy: number;

  // Attributes below are specified in g/100g
  private _water: number;
  private _protein: number;
  private _glucid: number;
  private _lipid: number;
  private _sugar: number;
  private _amidon: number;
  private _fiber: number;
  private _unsaturedFattyAcides: number;
  private _monoUnsaturedFattyAcides: number;
  private _polyUnsaturedFattyAcides: number;
  private _salt: number;

  private _categorie: Categorie;

  // Creator of ingredient
  private _owner: User;

  // User comment
  private _comment: string;

  // Getters and setters
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get urlImage(): string {
    return this._urlImage;
  }
  public set urlImage(value: string) {
    this._urlImage = value;
  }

  public get energy(): number {
    return this._energy;
  }
  public set energy(value: number) {
    this._energy = value;
  }

  public get water(): number {
    return this._water;
  }
  public set water(value: number) {
    this._water = value;
  }
  public get protein(): number {
    return this._protein;
  }
  public set protein(value: number) {
    this._protein = value;
  }
  public get glucid(): number {
    return this._glucid;
  }
  public set glucid(value: number) {
    this._glucid = value;
  }
  public get lipid(): number {
    return this._lipid;
  }
  public set lipid(value: number) {
    this._lipid = value;
  }
  public get sugar(): number {
    return this._sugar;
  }
  public set sugar(value: number) {
    this._sugar = value;
  }
  public get amidon(): number {
    return this._amidon;
  }
  public set amidon(value: number) {
    this._amidon = value;
  }
  public get fiber(): number {
    return this._fiber;
  }
  public set fiber(value: number) {
    this._fiber = value;
  }
  public get unsaturedFattyAcides(): number {
    return this._unsaturedFattyAcides;
  }
  public set unsaturedFattyAcides(value: number) {
    this._unsaturedFattyAcides = value;
  }
  public get monoUnsaturedFattyAcides(): number {
    return this._monoUnsaturedFattyAcides;
  }
  public set monoUnsaturedFattyAcides(value: number) {
    this._monoUnsaturedFattyAcides = value;
  }
  public get polyUnsaturedFattyAcides(): number {
    return this._polyUnsaturedFattyAcides;
  }
  public set polyUnsaturedFattyAcides(value: number) {
    this._polyUnsaturedFattyAcides = value;
  }
  public get salt(): number {
    return this._salt;
  }
  public set salt(value: number) {
    this._salt = value;
  }

  public get categorie(): Categorie {
    return this._categorie;
  }
  public set categorie(value: Categorie) {
    this._categorie = value;
  }

  // Creator of ingredient
  public get owner(): User {
    return this._owner;
  }
  public set owner(value: User) {
    this._owner = value;
  }

  // User comment
  public get comment(): string {
    return this._comment;
  }
  public set comment(value: string) {
    this._comment = value;
  }

}

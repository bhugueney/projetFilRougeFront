import { User } from './user.model';
import { Categorie } from './categorie.model';
export class Ingredient {
  private id: number;
  private name: string;

  private energy: number;
  private water: number;
  private protein: number;
  private glucid: number;
  private lipid: number;
  private sugar: number;
  private amidon: number;
  private fiber: number;
  private unsaturedFattyAcides: number;
  private monoUnsaturedFattyAcides: number;
  private polyUnsaturedFattyAcides: number;
  private salt: number;

  private categorie: Categorie;

  private owner: User;

}

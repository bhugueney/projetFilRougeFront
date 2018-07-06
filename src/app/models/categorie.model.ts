export class Categorie {
  private _id: number;
  private _name: string;
  private _parent: Categorie;
  private _listOfChildren: Categorie[] = new Array<Categorie>();

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

  public get parent(): Categorie {
    return this._parent;
  }
  public set parent(value: Categorie) {
    this._parent = value;
  }

  public get listOfChildren(): Categorie[] {
    return this._listOfChildren;
  }
  public set listOfChildren(value: Categorie[]) {
    this._listOfChildren = value;
  }

  constructor(id: number, name: string, parent: Categorie) {
    this.id = id;
    this.name = name;
    this. parent = parent;
  }
}

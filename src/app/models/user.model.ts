export class User {
    private _id: number;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _password: string;
    private _role: string;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }

    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get password(): string {
      return this._password;
    }

    public set password(value: string) {
      this._password = value;
    }

    public get role(): string {
      return this._role;
    }

    public set role(value: string) {
      this._role = value;
    }

    constructor(id: number, firstName: string, lastName: string, email: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

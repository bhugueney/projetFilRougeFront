import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  users: User[] =  [
    new User(1, 'Frédérick', 'Pareja', 'frederic.pareja.pf1@gmail.com'),
    new User(2, 'Hugues', 'Poumeyrol', 'hugues.poumeyrol.pf1@gmail.com'),
    new User(3, 'Gabriel', 'Wisniewski', 'gabriel.wisniewski@gmail.com')
   ];

  private _loggedUser: User = null;

  public get loggedUser(): User {
    return this._loggedUser;
  }

  public set loggedUser(user: User) {
      this._loggedUser = user;
  }

  constructor() {
    const storedUserId = localStorage.userId;
    this.loggedUser = this.getById(storedUserId);

    // fake authentification, a enlver plus tard
    if (!this.loggedUser) {
      this.authenticate('hugues.poumeyrol.pf1@gmail.com', '');
    }

   }


   // TODO : a remplacer par vraie méthode
  public authenticate(email: string, password) {
    let retUser = this.users.find( (user) => user.email === email);
    if (retUser) {
      localStorage.userId = retUser.id;
    } else {
      retUser = null;
      localStorage.userId = null;
    }
    this.loggedUser = retUser;
  }


  private getById(id: number) : User {
    let retUser = this.users.find( (user) => user.id === id);
    if (!retUser) { retUser = null; }
    return retUser;
  }


  private getFakeUserFred(): User {
    return new User(
      1,
      'Frédérick',
      'Pareja',
      'frederic.pareja.pf1@gmail.com',
    );
  }

  private getFakeUserHugues(): User {
    return new User(
      2,
      'Hugues',
      'Poumeyrol',
      'hugues.poumeyrol.pf1@gmail.com',
    );
  }

  private getFakeUserGab(): User {
    return new User(
      3,
      'Gabriel',
      'Wisniewski',
      'gabriel.wisniewski@gmail.com',
    );
  }

}

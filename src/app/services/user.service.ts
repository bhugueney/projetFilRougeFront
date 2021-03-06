import { PreparationService } from 'src/app/services/preparation.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';
import { MatDialog } from '../../../node_modules/@angular/material';
import { DialogYesNoComponent } from 'src/app/components/dialog-yes-no/dialog-yes-no.component';
import { environment } from '../../environments/environment';
import { HttpClient } from '../../../node_modules/@angular/common/http';

// interface ICallbackString { ( s: string ): void; }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // --------------------------
  // Attributs Static
  // --------------------------

  static debugMode = false; // mettre a true pour afficher les logs dans la console

  static readonly URL_USER = environment.backEndUrl + '/users';

  private static users: User[] =  [
    new User(1, 'admin', 'admin', 'pf1.fhg@gmail.com'),
    new User(2, 'Frédérick', 'Pareja', 'frederic.pareja.pf1@gmail.com'),
    new User(3, 'Hugues', 'Poumeyrol', 'hugues.poumeyrol.pf1@gmail.com'),
    new User(4, 'Gabriel', 'Wisniewski', 'gabriel.wisniewski@gmail.com')
   ];


  // --------------------------
  // Attributs d'instance
  // --------------------------
  protected authenticatedUser: BehaviorSubject<User> = new BehaviorSubject<User>(UserService.getUserByLocalStorage());
  protected isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);



  // --------------------------
  // Methodes Static
  // --------------------------

  // pour retrouver un utilisateur par son id
  private static getById(id: number): User {
    let retUser = UserService.users.find( (user) => user.id === id);
    if (!retUser) { retUser = null; }
    return retUser;
  }

  // pour retrouver un utilisateur par son id stocké en local storage
  private static getUserByLocalStorage(): User {

    // récupère l'id du dernier utilisateur connecté depuis le local Storage
    const storedUserId = +localStorage.userId;
    if (UserService.debugMode) {
      console.log('getUserByLocalStorage. storedUserId = ', storedUserId);
    }

    // recherche l'utilisateur correspondant a cet id
    const foundUser = this.getById(storedUserId);
    if (UserService.debugMode) {
      console.log('getUserByLocalStorage. foundUser = ', foundUser);
    }

    return foundUser;
  }


  // --------------------------
  // Constructeur
  // --------------------------
  constructor( private router: Router,
               private preparationService: PreparationService,
               private dialog: MatDialog,
               private httpClient: HttpClient
             ) {

    // met en place une observation du changement de authenticatedUser
    // pour mettre a jour automatiquement isAuthenticated
    // !!userChanged est évalué a vrai si authenticatedUser est défini et n'est pas null, faux autrement
    this.authenticatedUser.subscribe( (userChanged) => {

      // emet un changement de isAuthenticated
      // (
      //   l'expression !!userChanged converti l'evaluation de userChanged
      //   en booleen vrai si userChanged est défini et pas null, faux sinon
      // )
      if (UserService.debugMode) {
        console.log('User Service changement de authenticatedUser détecté, userChanged = ', userChanged);
      }
      this.isAuthenticated.next(!!userChanged);

      // met a jour le local storage userID avec : le Id de userChanged si userChanged est défini et pas null, null sinon
      const newID = (!!userChanged) ? userChanged.id : null;
      if (UserService.debugMode) {
        console.log('User Service changement de authenticatedUser détecté, newID = ', newID);
      }
      if (newID) {
        localStorage.userId = newID; // stocke en local l'id pour prochaine utilisation
      } else {
        localStorage.removeItem('userId'); // si null retire le stockage local
      }

      if (UserService.debugMode) {
        console.log('User Service changement de authenticatedUser détecté =', this.authenticatedUser,
                    'isAuthenticated = ', this.isAuthenticated
                   );
      }
    });

    if (UserService.debugMode) {
      console.log('User Service constructeur. authenticatedUser =', this.authenticatedUser, 'isAuthenticated = ', this.isAuthenticated);
    }
   }


  // --------------------------
  // Methodes d'Instance
  // --------------------------

   // methode pour recuperer l'utilisateur connecté !!! cette methode emet un observable
   public getAauthenticatedUser(): Observable<User> {
    return this.authenticatedUser;
  }

  // methode pour savoir si un utilisateur est connecté !!! cette methode emet un observable
  public isUserConnected(): Observable<boolean> {
    return this.isAuthenticated;
  }



   // methode pour authentifier un utilisateur avec son email et password
   // TODO : actuellement ne fait aucune vérification, a compléter plus tard
  public authenticate(email: string, password, callbackFunction) {
    const jSonauthToken = `{email: \'${email}\', password: \'${password}\'}`; // create a json string token object
    const b64jSonauthToken = btoa(jSonauthToken); // encoding in base64 format

    // call then backend for authentification and subscribe for return
    this.httpClient.get<User>(UserService.URL_USER + '/authenticate?authToken=' + b64jSonauthToken).subscribe(
       (userFromBack: User) => {
         // success call to back
         console.log('return form back authtenticate : ', userFromBack);
         localStorage.userId = userFromBack.id; // storing the id in local storage
         this.authenticatedUser.next(userFromBack); // we set authenticatedUser with returned user
         callbackFunction('OK');
       },
       (err) => {
         // an error has occurred when calling back
         console.log('return form back authtenticate : ', err);
         localStorage.removeItem('userId'); // cleanning the id in local storage
         this.authenticatedUser.next(null); // we set authenticatedUser to null
         let message = '';
         switch (err.status) {
            case 401 : { message = 'Login ou mot de passe incorrects !'; break; } // mauvais mot de passe
            case 404 : { message = 'Login ou mot de passe incorrects !'; break; } // mauvais email
            default : { message = 'Une erreur est survenue sur le serveur, contactez l\'administrateur'; break; } // mauvais email
         }
         callbackFunction(message);
       }
    );
  }



  public disconnect() {

    const dialogRef = this.dialog.open(DialogYesNoComponent,
      {data: {title: 'Confirmation déconnexion',
              message: 'Etes-vous sûr de vouloir vous déconnecter ?\nCela vas entrainer l\'abandon de la tache en cours.'
             }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // emet une nouvelle valeur pour authenticatedUser
        this.authenticatedUser.next(null);
        if (UserService.debugMode) { console.log('User Service disconnect appellé. loggedUser =', this.authenticatedUser); }
        this.router.navigateByUrl('/main');
        this.preparationService.razPreparation();
      }
    });
  }

}

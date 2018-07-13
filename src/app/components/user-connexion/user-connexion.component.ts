import { DialogOkComponent } from './../dialog-ok/dialog-ok.component';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-connexion',
  templateUrl: './user-connexion.component.html',
  styleUrls: ['./user-connexion.component.css']
})
export class UserConnexionComponent implements OnInit {

  email = '';
  password = '';

  constructor( private userService: UserService,
               private location: Location,
               private dialog: MatDialog
             ) {
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.userService.authenticate(
      this.email,
      this.password,
      // fonction callback appellée par authenticate
      (messageRetour: string) => {
        if (messageRetour === 'OK') {
          // si l'authentifcation a réussie
          this.location.back();
        } else {
          // si une erreur est survenue
          const dialogRef = this.dialog.open(DialogOkComponent,
            {data: {title: 'Erreur lors de l\'authentification', message: messageRetour}});

        }
      }
    );
  }

}

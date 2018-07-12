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
               private location: Location
             ) {
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.userService.authenticate(this.email, this.password);
    this.location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PreparationService } from '../../services/preparation.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isUserConnected$: Observable<boolean> = this.userService.isUserConnected();
  userConnected: User = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private preparationService: PreparationService,
    public userService: UserService
  ) {
      // met en place le suivi de l'utilisateur
      this.userService.getAauthenticatedUser().subscribe( (user) => { this.userConnected = user; });
  }

  ngOnInit() { }


}

import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { PreparationService } from 'src/app/services/preparation.service';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  isUserConnected$: Observable<boolean> = this.userService.isUserConnected();


  constructor(  private preparationService: PreparationService,
                public userService: UserService
              ) { }

  ngOnInit() {
  }

}

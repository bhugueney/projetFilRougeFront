import { Component, OnInit } from '@angular/core';
import { PreparationService } from 'src/app/services/preparation.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  userConnected = true; // localStorage.userId;

  constructor(private preparationService: PreparationService) { }

  ngOnInit() {
  }

  doNewPreparation() {
    this.preparationService.setNewPreparation();
  }
}

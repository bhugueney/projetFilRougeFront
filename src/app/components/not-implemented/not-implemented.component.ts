import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-implemented',
  templateUrl: './not-implemented.component.html',
  styleUrls: ['./not-implemented.component.css']
})
export class NotImplementedComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  public back() {
    this.location.back();
  }
}

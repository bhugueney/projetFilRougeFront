import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-ok',
  templateUrl: './dialog-ok.component.html',
  styleUrls: ['./dialog-ok.component.css']
})
export class DialogOkComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}

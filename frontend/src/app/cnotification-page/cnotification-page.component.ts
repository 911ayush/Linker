import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cnotification-page',
  templateUrl: './cnotification-page.component.html',
  styleUrls: ['./cnotification-page.component.css']
})
export class CnotificationPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  notifications=[{name:"ayush"},{name:"Sudyut"},{name:"Boss"},{name:"Divyansh"}];
}

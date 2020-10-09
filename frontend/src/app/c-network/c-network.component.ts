import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-network',
  templateUrl: './c-network.component.html',
  styleUrls: ['./c-network.component.css']
})
export class CNetworkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  notifications=[{name:"ayush"},{name:"Sudyut"},{name:"Boss"},{name:"Divyansh"}];
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dev-network',
  templateUrl: './dev-network.component.html',
  styleUrls: ['./dev-network.component.css']
})
export class DevNetworkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  notifications=[{name:"ayush"},{name:"Sudyut"},{name:"Boss"},{name:"Divyansh"}];
}

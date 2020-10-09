import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-c',
  templateUrl: './header-c.component.html',
  styleUrls: ['./header-c.component.css']
})
export class HeaderCComponent implements OnInit {

  constructor() { }
  search="search....";
  ngOnInit(): void {
  }
  onkeyup(){
    console.log(this.search);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email="ayush";
  search="search...."
  constructor() { }

  ngOnInit(): void {
  }
  onkeyup(){
    console.log(this.email);
  }
}

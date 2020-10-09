import { Component, OnInit } from '@angular/core';
//import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor() { }
  email="ayush";
  ngOnInit(): void {
  }
  openWritePostContainer(){
    alert("working");
  }
}

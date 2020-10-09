import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-c',
  templateUrl: './feed-c.component.html',
  styleUrls: ['./feed-c.component.css']
})
export class FeedCComponent implements OnInit {

  constructor() { }
  email="ayush";
  ngOnInit(): void {
  }
  openWritePostContainer(){
    alert("working");
  }
}

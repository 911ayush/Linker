import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dev-owner-page',
  templateUrl: './dev-owner-page.component.html',
  styleUrls: ['./dev-owner-page.component.css']
})
export class DevOwnerPageComponent implements OnInit {
  name="Ayush Yadav";
  about="A Web Developer from India";
  skills:string[]=['Web Developer ','Frontend Developer','Web Developer ','Frontend Developer'];
  intrests:string[]=['hockey','footbaal','cricket','badminton'];
  skill(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  }
  intrest(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.intrests, event.previousIndex, event.currentIndex);
  }

  location="Farrukhabad,U.P."
  constructor() { }

  ngOnInit(): void {
  }

}

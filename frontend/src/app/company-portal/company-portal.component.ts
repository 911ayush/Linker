import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-company-portal',
  templateUrl: './company-portal.component.html',
  styleUrls: ['./company-portal.component.css']
})
export class CompanyPortalComponent implements OnInit {

  name="Microsoft";
  about="We hire the best ppl in the business";
  skills:string[]=['Web Developer ','Frontend Developer','Web Developer ','Frontend Developer'];
  skill(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  }
  location="Amrica di gali me"
  constructor() { }

  ngOnInit(): void {
  }

}

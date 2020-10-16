import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ConnectionServiceService } from '../connection-service.service';

@Component({
  selector: 'app-company-portal',
  templateUrl: './company-portal.component.html',
  styleUrls: ['./company-portal.component.css']
})
export class CompanyPortalComponent implements OnInit {

  name="";
  about="";
  location="";
  skills:string[]=[];
  skill(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  }
  
  constructor(private connectionService:ConnectionServiceService) { }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.connectionService.getprofile(5).subscribe((data) => {
      console.log(data);
      this.about = data.about;
      this.name = data.name;
      this.location = data.location;
      this.skills = data.skill;
    });
  }
}

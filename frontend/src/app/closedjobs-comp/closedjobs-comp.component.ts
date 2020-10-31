import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';

@Component({
  selector: 'app-closedjobs-comp',
  templateUrl: './closedjobs-comp.component.html',
  styleUrls: ['./closedjobs-comp.component.css']
})
export class ClosedjobsCompComponent implements OnInit {
  
  isClosedList:boolean=false;
  closedList:any=[];
  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.fetchClosedList()
  }
  fetchClosedList(){
    this.jobService.getAllClosed().subscribe(
      data=>{
        console.log(data);
        this.closedList = data;
        if(data.length==0){
          this.isClosedList=false;
        }
        else{
          this.isClosedList = true;
        }
      },
      error=>console.log(error)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-closedjobs-comp',
  templateUrl: './closedjobs-comp.component.html',
  styleUrls: ['./closedjobs-comp.component.css']
})
export class ClosedjobsCompComponent implements OnInit {
  
  isClosedList:boolean=false;
  closedList:any=[];
  constructor(private router:Router ,private jobService: JobService) { }

  ngOnInit(): void {
    this.fetchClosedList()
  }
  fetchClosedList(){
    this.jobService.getAll().subscribe(
      data=>{
        console.log(data);
        this.closedList = data;
        if(data.length==0){
          this.isClosedList=false;
        }
        else{
          this.isClosedList = true;
          this.getApplicInfo();
        }
      },
      error=>console.log(error)
    );
   }
   shoeDetails(event){
    var id = "form-area"+event.target.attributes.id.nodeValue;
    if(document.getElementById(id).style.display=="none"){
      console.log("hidden");
      document.getElementById(id).style.display="block";
    }
    else{
      console.log("shown");
      document.getElementById(id).style.display="none";
    }
  }
  getApplicInfo(){
    var devList = JSON.parse(localStorage.getItem('developersList'));
    console.log(devList);
    for(let i = 0;i<this.closedList.length;i++){
      for(let j = 0;j<this.closedList[i].applicants.length;j++){
        for(let k = 0;k<devList.length;k++){
          if(devList[k]._id===this.closedList[i].applicants[j].dev){
            this.closedList[i].applicants[j].name = devList[k].name;
            console.log("matched");
            console.log(devList[k].name);
            break;
          }
        }
      }
    }
  }
  seedev(event){
    console.log(event.target.attributes.id.nodeValue);
    var gg = event.target.attributes.id.nodeValue;
    this.router.navigate(['/dev/',gg]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ConnectionServiceService } from '../connection-service.service';
import { JobService } from '../job.service';


@Component({
  selector: 'app-jobpage',
  templateUrl: './jobpage.component.html',
  styleUrls: ['./jobpage.component.css']
})
export class JobpageComponent implements OnInit {

  constructor(private connectionService: ConnectionServiceService,private jobService:JobService) { }
  ownerid;
  jobsid;
  alljobs:any=[];
  isAlljobs:boolean=false;
  appliedjobs:any=[];
  isApplied:boolean=false;
  posts=[{post:"General Manager"},{post:"HR post"}];
  applicants=[{name:"Ayush yadav"},{name:"Raghav"}];
  ngOnInit(): void {
    this.fetchJobs();
    this.getownerid();
  }
  getownerid(){
    this.ownerid = localStorage.getItem('id');
    console.log(this.ownerid);
  }
  fetchJobs(){
    this.getAllJobs();
    this.getAppliedJobs();
  }
  //fetching jobs which dev has applied
  getAppliedJobs(){
    this.jobService.getAppliedJobs().subscribe(
      data=>{
        console.log(data);
        this.appliedjobs= data ;
        if(data==null){
          this.isApplied = false;
        }
        if(data.length==0){
          this.isApplied = false;
        }
        else{
          this.isApplied = true;
        }
      },
      error=>console.log(error)
    );
  }
  //fetching jobs from subscribed company
  getAllJobs(){
    this.jobService.getAllJobs().subscribe(
      data=>{
        console.log(data);
        this.alljobs= data;
        for(let i =0;i<this.alljobs.length;i++){
          var flag=0;
          for(let j =0;j<this.alljobs[i].applicants.length;j++){
            if(this.alljobs[i].applicants[j].dev == this.ownerid){
              this.alljobs[i].isapplied=true;
              flag=1;
            }
          }
          if(flag==0){
            this.alljobs[i].isapplied=false;
          }
        }
        if(data.length==0){
          this.isAlljobs = false;
        }
        else{
          this.isAlljobs = true;
        }
      },
      error=>console.log(error)
    );
  }
  formdisplay(event){
    if(document.getElementById(event).style.display==="none"){
      document.getElementById(event).style.display="block";
    }
    else{
      document.getElementById(event).style.display="none";
    }
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
  shoeDetailsappliedIn(event){
    var id = "detail-area"+event.target.attributes.id.nodeValue;
    if(document.getElementById(id).style.display=="none"){
      console.log("hidden");
      document.getElementById(id).style.display="block";
    }
    else{
      console.log("shown");
      document.getElementById(id).style.display="none";
    }
  }
  applyjob(event){
    var id = event.target.attributes.id.nodeValue;
    console.log(id);
    this.jobsid = id;
    document.getElementById('confbox').style.display="block";    
  }
  ApplyNow(){
    document.getElementById('confbox').style.display="none";
    this.jobService.applyforjob(this.jobsid).subscribe(
      data=>{
      alert("Applied succesfully")
      console.log(data)
    },
      error=>{
        alert(error.error.error);
        console.log(error.error);
      }
    );
  }
  backconfbox(){
    this.jobsid='';
    console.log(this.jobsid);
    document.getElementById('confbox').style.display="none";
  }
  Shortthem(){ 
    var rmu= Date.now();
    var date=this.alljobs[1].createdAt;
    console.log(rmu);
  }
}

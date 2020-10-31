import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { JobService } from '../job.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-c-manage',
  templateUrl: './c-manage.component.html',
  styleUrls: ['./c-manage.component.css']
})
export class CManageComponent implements OnInit {
  notibody:string='';
  notihead:string='';
  post:string='';
  createdBy:string='';
  selectedRange:any;
  description:string='';
  alldatapresent:boolean=false;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  //array to save live vaccancies
  alljobs:any=[];
  isallonlinejobs:boolean=false;
  allonlinejobs:any=[];
  alljobsdata:boolean=false;
  //data fields to append and recommend skills required to the company
  skilltoa="";
  skills:string[]=["ayush","yadav"];
  
  constructor(private notificationService: NotificationService ,private jobService: JobService) { }

  ngOnInit(): void {
    this.fetchCurrentOpenings();
  }
  //3 below functions are to update and manage skills list recommended by company
  skill(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  }
  appendSkill(){
    this.skills.push(this.skilltoa);
    this.skilltoa="";
  }
  delSkill(event){
    this.skills.splice(this.skills.indexOf(event.target.attributes.id.nodeValue),1);
    console.log(this.skills);
  }
  //fetching jobs data openings
  fetchCurrentOpenings(){
    this.jobService.getOngoing().subscribe(
      data=>{this.allonlinejobs = data;
        if(data.length==0){
          this.isallonlinejobs=false;
        }
        else{
          this.isallonlinejobs = true;
        }
        //this for test will deleted in future
        for(let i=0;i<this.allonlinejobs.length;i++){
          this.allonlinejobs[i].skil=["ayus","yadd"];
        }
        console.log(this.allonlinejobs);},
      error=>console.log(error)
    );
    this.jobService.getAll().subscribe(
      data=>{this.alljobs = data;
        if(data.length==0){
          this.alljobsdata=false;
        }
        else{
          this.alljobsdata = true;
        }
        //this for test will deleted in future
        for(let i=0;i<this.alljobs.length;i++){
          this.alljobs[i].skil=["ayus","yadd"];
        }
        console.log(this.alljobs);},
      error=>console.log(error)
    );
  }
  posts=[{post:"General Manager"},{post:"HR post"}];
  applicants=[{name:"Ayush yadav"},{name:"Raghav"}];
  formdisplay(event){
    if(document.getElementById(event).style.display==="none"){
      document.getElementById(event).style.display="block";
    }
    else{
      document.getElementById(event).style.display="none";
    }
  }

  displayappl(post){
    post = post+"appl";

    if(document.getElementById(post).style.display==="none"){
      
      document.getElementById(post).style.display="block";
    }
    else{
     
      document.getElementById(post).style.display="none";
    }
  }
  stopAccepting(post){
    alert(post);
  }
  livetheSearch(){
   // var date=new Date();
    //var date = this.datepipe.transform(this.range.value.start, 'yyyy-MM-dd')
   // Date s = ;
  // var st = this.range.value.start;
  // var sta = JSON.parse(st);
    var data={
     start:JSON.parse(JSON.stringify(this.range.value.start)),
     end:JSON.parse(JSON.stringify(this.range.value.end))
    }
    var toSend={
      post:this.post.toUpperCase(),
      createdBy:this.createdBy,
      selectedRange:data,
      description:this.description,
      recommended:this.skills
    }
    console.log(toSend);
    console.log(this.skills);
    this.jobService.createOpening(toSend).subscribe(
      data=>{
        
        console.log(data)
      },
      error=>{
        if(error.status == 200 ){
          alert("Succesfully Uploaded");
          document.getElementById('createjob').style.display="none";
          document.getElementById('confbox').style.display="none";
        }
        else{
        alert("Upload fails try again");
        console.log(error);
        }
      }
    );
    console.log(toSend);
  }
  openConfbox(){
    if(this.post.length==0||this.createdBy.length==0||this.description.length==0||this.skills.length==0||JSON.parse(JSON.stringify(this.range.value.start))==null||JSON.parse(JSON.stringify(this.range.value.end))==null){
      alert("Fill the all the fields");
    }
    else{
      document.getElementById('confbox').style.display="block";
    }
     
  }
  
  backbox(){
    document.getElementById('createjob').style.display="none";
    document.getElementById('confbox').style.display="none";
  }
  opencreaatbox(){
    document.getElementById('createjob').style.display="block";
    
  }
  backconfbox(){
    document.getElementById('confbox').style.display="none"; 
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
  opennotifBox(){
    document.getElementById('notifiyfor').style.display="block";
  }
  backnotibox(){
    document.getElementById('notifiyfor').style.display="none"; 
  }
  submitniti(){
    if(this.notibody.length==0||this.notihead.length==0){
      alert("fill the form");
    }
    else{
      var notif={
        'head':this.notihead,
        'body':this.notibody
      }
      this.notificationService.generatenotific(notif).subscribe(
        (data)=>{console.log(data);
          document.getElementById('notifiyfor').style.display="none";},
        (error)=>console.log(error)
      );

    }
  }
}

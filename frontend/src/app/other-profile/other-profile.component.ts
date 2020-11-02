import { Component, OnInit,OnChanges } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ConnectionServiceService } from '../connection-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute,Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.component.html',
  styleUrls: ['./other-profile.component.css']
})
export class OtherProfileComponent implements OnInit  {
 // id = "5f914c3953bbe8035c059ba3";
 compn:boolean;
  id;
  //="5f8e6fcfb75c9c2f74e39bc5"
  dpo:any="../assets/anonymous.PNG";
  abou:boolean=false;
  bskill:boolean=false;
  binterest:boolean=false;
  image;
  name="";
  about="";
  location="";
  skills:string[]=[];
  intrests:string[]=[];
  asss:boolean;
  constructor(private connectionService: ConnectionServiceService,private domSanitizer:DomSanitizer,private router:Router ,private route: ActivatedRoute) {
    if(localStorage.getItem("As")==='company'){
   //   alert("hhh");
      this.asss=true;
    }
    else{
      this.asss=false;
    }
    router.events.subscribe(
      (val)=>{
        this.fetchup();
    });
    if(localStorage.getItem('As')=="company"){
      this.compn = true;
    }
    else{
      this.compn = false;
    }
    // this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    // console.log(this.id);
    this.readId();
      setTimeout(()=>{
        this.fetchData();
        this.getdp();
      },2000
      );
   }
  // id: Observable<string> = this.route.params.pipe(map(p => p.id));
 // console.log(this.router.url);
  skill(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  }
  ngOnInit(){

  }
  
  
    fetchup(){
    // this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    // console.log(this.id);
    this.readId();
      setTimeout(()=>{
        this.fetchData();
        this.getdp();
      },2000
      );
    // this.fetchData();
    // this.getdp();
  }
  readId(){
    console.log("readId called");
    this.id =(this.route.snapshot.paramMap.get('id'));
  }
  url = "./assets/cancer-hospital.jpg";

  fetchData(){
    console.log("fetch data");
    this.connectionService.viewOthersProfile(this.id).subscribe((data) => {
      if(data){
       this.about = data.about;
       console.log(data.about,this.about);
       this.name = data.name;
      // this.location = data.location;
       this.skills = data.skills;
      // this.intrests = data.interest;
      if(this.about.length){
        this.abou = true; 
      }
      else{
        this.abou = false;
      }
      if(this.skills.length){
        
        this.bskill = true; 
      }
      else{
        
        this.bskill = false;
      }
      }
      else{
        console.log("nothimd");
      }
       
    },
    error=>{
      alert("user Not found");
      console.log(error.status);
    }
    );
    
  }
  getdp(){
    console.log("get dp");
    this.connectionService.getothersdp(this.id).subscribe(
      data=> { 
        console.log(data);
          var buffdp = data;
          var TYPED_ARRAY = new Uint8Array(data.avatar.data);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
            return data + String.fromCharCode(byte);
            }, '');
          let base64String = btoa(STRING_CHAR);
       
         this.dpo = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + base64String);
      },
      error => console.log(error)
    );
  }
  //function to follow one
  followit(){
    alert("working");
    this.connectionService.followDev(this.id).subscribe(
      (data)=>{
       
        alert("follwing")},
      (error)=>{
        if(error.status === 404){
          console.log(error);
          alert("already following");
        }
        }
    );
  }
}
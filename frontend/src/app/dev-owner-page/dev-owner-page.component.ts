import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ConnectionServiceService } from '../connection-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-dev-owner-page',
  templateUrl: './dev-owner-page.component.html',
  styleUrls: ['./dev-owner-page.component.css']
})
export class DevOwnerPageComponent implements OnInit {
  profstat:boolean;
  dpo:any="../assets/anonymous.PNG";
  //dpo;
  dcd;
  myfeeds:boolean=false;
  abou:boolean=false;
  bskill:boolean=false;
  binterest:boolean=false;
  image;
  name="";
  nametoc="";
  about="";
  abouttoc="";
  location="";
  intresttoc="";
  skilltoc="";
  locationtoc="";
  skills:string[]=[];
  skillstoc:string[]=[];
  intrests:string[]=[];
  intreststoc:string[]=[];
  skill(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  }
  intrest(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.intrests, event.previousIndex, event.currentIndex);
  }

  
  constructor(private feedService:FeedService ,private connectionService: ConnectionServiceService,private domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.fetchData();
    this.getdp();
    this.getMyDevFeed()
  }
  url = "./assets/cancer-hospital.jpg";
  feeds:any=[];
  fetchData(){
    this.connectionService.getprofile().subscribe((data) => {
      this.profstat = true;
      if(data){
        this.about = data.about;
       this.abouttoc = data.about;
       console.log(data.about,this.about);
       this.name = data.name;
       this.nametoc = data.name;
      // this.location = data.location;
      // this.locationtoc = data.location;
       this.skills = data.skills;
       while(this.skillstoc.length){
        this.skillstoc.pop();
      }
      while(this.intreststoc.length){
        this.intreststoc.pop();
      }
      for(var va of data.skills){
        this.skillstoc.push(va);
      }
      // this.intrests = data.interest;
      // for(var va of data.interest){
      //   this.intreststoc.push(va);
      // }
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
      if(this.intrests.length){
        this.binterest = true; 
      }
      else{
        this.binterest = false;
      }
      }
      else{
        console.log("nothimd");
      }
       
    },
    error=>{
      console.log(error.status);
      if(error.status==420){
        this.profstat = false;
        this.name="Name Not Provided";
      }
    }
    );
    
  }
  selectImage(event){
    if(event.target.files.length>0){
      if(event.target.files){
      }
      const file = event.target.files[0];
      this.image = file; 
    }
    this.preprev(event);
    document.getElementById('dpcb').style.display="block";
  }
  preprev(e){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url = event.target.result;
      }
    }
  }

  uploaddp(){
    const formData = new FormData();
    formData.append('profilepic',this.image);
    this.connectionService.uploaddp(formData).subscribe(
      (res)=> {
        document.getElementById('dpcb').style.display="none";
      },

      (err)=> {console.log(err);
        document.getElementById('dpcb').style.display="none";
      }
      );
      setTimeout(()=>{
        this.getdp();
      },2000);
      
  }
  getdp(){
    console.log("get dp");
   // var id = localStorage.getItem('id');
    this.connectionService.getownerdp().subscribe(
      data=> { 
        console.log("kk");
          var TYPED_ARRAY = new Uint8Array(data.avtar.data);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
            return data + String.fromCharCode(byte);
            }, '');
          let base64String = btoa(STRING_CHAR);
         this.dpo = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + base64String);

      },
      error => console.log(error.error)
    );
  }

  backdpcb(){
    document.getElementById('dpcb').style.display="none";
  }
  openeditcomponent(){
    document.getElementById('editcompo').style.display="block";
    document.getElementById('name').style.display="block";
    document.getElementById('location').style.display="none";
    document.getElementById('skills').style.display="none";
    document.getElementById('interest').style.display="none";
  }
  backeditcompo(){
    while(this.skillstoc.length){
      this.skillstoc.pop();
    }
    while(this.intreststoc.length){
      this.intreststoc.pop();
    }
    for (var i of this.skills) {
      this.skillstoc.push(i);
    }
    for (var i of this.intrests) {
      this.intreststoc.push(i);
    }
    this.nametoc = this.name;
    this.locationtoc = this.location;
    document.getElementById('editcompo').style.display="none";
  }
  opname(){
    document.getElementById('name').style.display="block";
    document.getElementById('location').style.display="none";
    document.getElementById('skills').style.display="none";
    document.getElementById('interest').style.display="none";
  }
  oplocation(){
    document.getElementById('name').style.display="none";
    document.getElementById('location').style.display="block";
    document.getElementById('skills').style.display="none";
    document.getElementById('interest').style.display="none";
  }
  opskills(){
    document.getElementById('name').style.display="none";
    document.getElementById('location').style.display="none";
    document.getElementById('skills').style.display="block";
    document.getElementById('interest').style.display="none";
  }
  opinterest(){
    document.getElementById('name').style.display="none";
    document.getElementById('location').style.display="none";
    document.getElementById('skills').style.display="none";
    document.getElementById('interest').style.display="block";
  }
  appendInter(){
    this.intreststoc.push(this.intresttoc);
    this.intresttoc="";
  }
  appendSkill(){
    this.skillstoc.push(this.skilltoc);
    this.skilltoc="";
  }
  delSkill(event){
    this.skillstoc.splice(this.skillstoc.indexOf(event.target.attributes.id.nodeValue),1);
    console.log(this.skillstoc);
  }
  delinterest(event){
    this.intreststoc.splice(this.intreststoc.indexOf(event.target.attributes.id.nodeValue),1);
  }
  saveedits(){
    console.log(this.profstat);
    
    if(this.profstat){
      var data={
        "name":this.nametoc,
        "about":this.abouttoc,
        "skills":this.skillstoc 
      }
      this.connectionService.updateprofile(data).subscribe(() => {
        this.fetchData();
        //alert(response.status)
       }) ;
    }
    else{
      var jdata={
        "name":this.nametoc,
        "about":this.abouttoc,
        "address":this.locationtoc,
        "skills":this.skillstoc 
      }
      this.connectionService.setprofile(jdata).subscribe(() => {
        this.fetchData();
        //alert(response.status)
       }) ;
    }
    document.getElementById('aboutedit').style.display="none";
    document.getElementById('editcompo').style.display="none";
    
  }
  backeditabout(){
    document.getElementById('aboutedit').style.display="none";
  }
  openeditabout(){
    document.getElementById('aboutedit').style.display="block";
  }
  getMyDevFeed(){
    this.feedService.getMyDevFeed().subscribe(
      (data)=>{console.log(data);
      this.feeds = data;
      if(this.feeds.length == 0){
        this.myfeeds=false;
      }
      else{
        this.myfeeds= true;
      }
    },
      (error)=>console.log(error.error)
      );
  }
}
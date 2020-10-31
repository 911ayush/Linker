import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
//import { HeaderComponent } from '../header/header.component';
import { ConnectionServiceService } from '../connection-service.service';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer ,private connectionService: ConnectionServiceService,private feedService:FeedService) { }
  caption="";
  erroru:boolean=false;
  url:any;
  image:File;
  feeds:any=[];
  ngOnInit(): void {
    this.getTheFeeds()
  }
  openWritePostContainer(){
    document.getElementById("showcase").style.display="block";
  }
  hidepostarea(){
    document.getElementById("showcase").style.display="none";
  }
  sendMessage(){
    console.log(this.caption);
  }
  leavePic(){
    document.getElementById("prevpic").style.display="none";
  }
  showpic(event){
    if(event.target.files.length>0){
      if(event.target.files){
      }
      const file = event.target.files[0];
      this.image = file; 
    }
    this.preprev(event);
    document.getElementById('prevpic').style.display="block";
  }
  preprev(e){
    document.getElementById("prevpic").style.display="block";
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url = event.target.result;
      }
    }

  }
  uploadpost(){
    const formData = new FormData();
    formData.append('pic',this.image);
    formData.append('description',this.caption);
    //console.log(formData);
    this.feedService.uploadpost(formData).subscribe(
      (data)=> {
        alert("upload succesfull");
         document.getElementById('dpck').style.display="none";
         this.image = null;
         this.caption="";
         this.url;
      },
      (err)=> {
        this.erroru=true;
        if(err.error.error ==="Please Upload image in format of jpeg or jpg or png"){
          alert(err.error.error);
        }
        else if(err.status === 400){
          alert(err.error);
        }
        else if(err.status === 404){
          alert(err.error);
        }
        else{
          alert("upload succesfull");
          document.getElementById('showcase').style.display="none";
          this.caption="";
          this.url="";
        }
      }
      );
    //   .catch(()=>{
    //     setTimeout(()=>
    //     {if(this.erroru==false){
    //       alert("upload succesfull");
    //      document.getElementById('dpck').style.display="none";
    //      this.image = null;
    //      this.caption="";
    //      this.url;
    //   }
    // },1000);
    //   });   
  }
  getTheFeeds(){
    this.feedService.getFeeds().subscribe(
      (data)=>{
        console.log(data);
        this.feeds = data;
        console.log(data[0].image.data);
       },
      (error)=>console.log(error.error)
    );
  }
}

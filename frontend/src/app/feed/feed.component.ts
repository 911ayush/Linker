import { Component, OnInit } from '@angular/core';
//import { HeaderComponent } from '../header/header.component';
import { ConnectionServiceService } from '../connection-service.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private connectionService: ConnectionServiceService) { }
  email="ayush";
  caption="";
  url = "./assets/cancer-hospital.jpg";
  image;
  ngOnInit(): void {
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
    formData.append('file',this.image);
    formData.append('caption',this.caption);
    this.connectionService.uploadpost(formData,5).subscribe(
      (res)=> {
        alert("upload succesfull");
         document.getElementById('dpck').style.display="none";
      },

      (err)=> console.log(err)
      );
      
  }
}

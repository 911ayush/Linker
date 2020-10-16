import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ConnectionServiceService } from '../connection-service.service';

@Component({
  selector: 'app-dev-owner-page',
  templateUrl: './dev-owner-page.component.html',
  styleUrls: ['./dev-owner-page.component.css']
})
export class DevOwnerPageComponent implements OnInit {
  dp;
  image;
  name="";
  about="";
  location="";
  skills:string[]=[];
  intrests:string[]=[];
  skill(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
  }
  intrest(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.intrests, event.previousIndex, event.currentIndex);
  }

  
  constructor(private connectionService: ConnectionServiceService) { }

  ngOnInit(): void {
    this.fetchData();
  }
  url = "./assets/cancer-hospital.jpg";
  fetchData(){
    this.connectionService.getprofile(5).subscribe((data) => {
      console.log(data);
      this.about = data.about;
      this.name = data.name;
      this.location = data.location;
      this.skills = data.skill;
      this.intrests = data.interest
    });
  }
  selectImage(event){
    if(event.target.files.length>0){
      if(event.target.files){
      }
      const file = event.target.files[0];
      this.image = file; 
    }
    this.preprev(event);
    document.getElementById('dpck').style.display="block";
  }

  uploaddp(){
    alert("yess");
    const formData = new FormData();
    formData.append('file',this.image);
    this.connectionService.uploaddp(formData).subscribe(
      (res)=> {
        alert("Dp changed");
         document.getElementById('dpck').style.display="none";
      },

      (err)=> console.log(err)
      );
      
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
  back(){
    document.getElementById('dpck').style.display="none";
  }
}
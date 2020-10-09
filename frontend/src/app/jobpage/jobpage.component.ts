import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobpage',
  templateUrl: './jobpage.component.html',
  styleUrls: ['./jobpage.component.css']
})
export class JobpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
}

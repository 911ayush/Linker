import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  question1:string="sdfghjkl";
  constructor() { }
  sec:number=0;
  min:number=0;
  hour:number=0;
  ngOnInit(){
   
    var settime = setInterval(()=>{
      console.log("hh");
      this.sec++;
      if(this.sec===60){
        this.sec=0;
        this.min++;
        if(this.min===60){
          this.min=0;
          this.hour++;
        }
      }
    },1000);
    setTimeout(()=>{
      clearInterval(settime);
      document.querySelector('button').disabled = true;
    },30000);
  }
}

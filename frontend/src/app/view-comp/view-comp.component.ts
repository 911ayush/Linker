import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ConnectionServiceService } from '../connection-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import {ActivatedRoute,Router} from '@angular/router';
import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-view-comp',
  templateUrl: './view-comp.component.html',
  styleUrls: ['./view-comp.component.css']
})
export class ViewCompComponent implements OnInit {
  compn:boolean;
  id;
  action="follow";
  dpo:any="../assets/anonymous.PNG";
  dcd;
  image;
  abou:boolean=false;
  bskill:boolean=false;
  title="";
  about="";
  address=""
  lookup:string[]=[];
  
  url = "";
  skill(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lookup, event.previousIndex, event.currentIndex);
  }
  
  constructor(private connectionService:ConnectionServiceService,private router: Router,private domSanitizer:DomSanitizer,private route: ActivatedRoute) {
    router.events.subscribe(
      (val)=>{
        this.fetchup();
    });
   }

  ngOnInit() {
    if(localStorage.getItem('As')=="company"){
      this.compn = true;
    }
    else{
      this.compn = false;
    }
    //this.fetchData();
  }
  fetchup(){
    this.readId();
      setTimeout(()=>{
       // this.fetchData();
        this.getdp();
      },2000
      );
  }
  readId(){
    console.log("readId called");
    this.id =(this.route.snapshot.paramMap.get('id'));
  }
  fetchData(){
    this.connectionService.getocprofile(this.id).subscribe((data) => {
      console.log(data);
      this.title = data.title;
      this.about = data.about;
      this.lookup = data.lookup;
      if(this.lookup.length){
        this.bskill=true;
      }
      else{
        this.bskill=false;
      }
      if(data.about){
        this.abou=true;
      }
      else{
        this.abou=false;
      }
      this.address = data.address;
    });
  }

  getdp(){
    console.log("get dp");
    //var id = localStorage.getItem('id');
    // this.connectionService.getcodp(id).subscribe(
    //   data=> { 
    //     console.log("kk");
    //       var buffdp = data;
    //       var TYPED_ARRAY = new Uint8Array(data);
    //       const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
    //         return data + String.fromCharCode(byte);
    //         }, '');
    //       let base64String = btoa(STRING_CHAR);
       
    //      this.dpo = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + base64String);

    //     //  var buffer = new ArrayBuffer(64);
    //     //  buffer = data;
    //       //console.log(new Blob([data]));
    //     // }
    //   },
    //   error => console.log(error.status)
    // );
  }
  follow(){
    this.connectionService.followCompany(this.id).subscribe(
      data=>{
        //console.log(res.status),
        this.action = "follow";
      },
      error=>{
        if(error.error.error == "Error: You have Subscribed earlier"){
          this.action = "following";
          console.log("follwed");
        }
      }
    );
  }
}


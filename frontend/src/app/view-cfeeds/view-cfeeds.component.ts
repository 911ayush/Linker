import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
//import { HeaderComponent } from '../header/header.component';
import { ConnectionServiceService } from '../connection-service.service';

@Component({
  selector: 'app-view-cfeeds',
  templateUrl: './view-cfeeds.component.html',
  styleUrls: ['./view-cfeeds.component.css']
})
export class ViewCFeedsComponent implements OnInit {

  constructor(private domSanitizer:DomSanitizer ,private router:Router,private route:ActivatedRoute ,private connectionService: ConnectionServiceService) { 
    router.events.subscribe(
      (val)=>{
        this.fetchup();
    });
  }
  id="5f927a248e49333e2c528aa8";
  dpo:any="../assets/anonymous.PNG";
  dcd;
  title="";
  address=""
  url = "./assets/cancer-hospital.jpg";
  ngOnInit(): void {
   // this.fetchData()
  }
  fetchup(){
    this.getid();
    setTimeout(()=>{
      this.fetchData();
      this.getdp()
    },1000)
  }
  getid(){
    this.id =(this.route.snapshot.paramMap.get('id'));
  }
  fetchData(){
    this.connectionService.getocprofile(this.id).subscribe((data) => {
      console.log(data);
      this.title = data.title;
      this.address = data.address;
    });
  }
  getdp(){
    console.log("get dp");
    this.connectionService.getothercdp(this.id).subscribe(
      data=> { 
        console.log("kk");
          var buffdp = data;
          var TYPED_ARRAY = new Uint8Array(data.avatar.data);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
            return data + String.fromCharCode(byte);
            }, '');
          let base64String = btoa(STRING_CHAR);
       
         this.dpo = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + base64String);
      },
      error => console.log(error.status)
    );
  }
  // getmyFeedscompony(){
  //   this.feedService.getmyFeedscompony().subscribe(
  //     (data)=>{
  //     this.feeds = data;
  //     console.log(this.feeds);
  //   },
  //     (error)=>console.log(error)
  //   );
  //}
 
}


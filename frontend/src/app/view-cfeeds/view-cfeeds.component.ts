import { Component, OnInit } from '@angular/core';
//import { HeaderComponent } from '../header/header.component';
import { ConnectionServiceService } from '../connection-service.service';

@Component({
  selector: 'app-view-cfeeds',
  templateUrl: './view-cfeeds.component.html',
  styleUrls: ['./view-cfeeds.component.css']
})
export class ViewCFeedsComponent implements OnInit {

  constructor(private connectionService: ConnectionServiceService) { }
  id="5f927a248e49333e2c528aa8";
  dpo:any="../assets/anonymous.PNG";
  dcd;
  title="";
  address=""
  url = "./assets/cancer-hospital.jpg";
  ngOnInit(): void {
    this.fetchData()
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
 
}


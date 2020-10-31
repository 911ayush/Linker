import { Component, Input,OnInit,OnChanges,SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConnectionServiceService } from '../connection-service.service';
import { FeedService } from '../feed.service';

@Component({
  selector: 'post-templet',
  templateUrl: './post-templet.component.html',
  styleUrls: ['./post-templet.component.css']
})
export class PostTempletComponent implements OnChanges {
  img;
  dp:any="./assets/anonymous.PNG";
  userDetail:any;
  likes:any;
  type;
  name;
  constructor(private feedService: FeedService,private domSanitizer:DomSanitizer,private connectionService:ConnectionServiceService) { }
  @Input() feedData:any;
  ngOnChanges(changes:SimpleChanges): void {
    console.log(this.feedData);
    var TYPED_ARRAY = new Uint8Array(this.feedData.image.data);
  const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
    return data + String.fromCharCode(byte);
    }, '');
  let base64String = btoa(STRING_CHAR);
  this.img = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + base64String);
  this.likes=this.feedData.like;
  this.type = this.feedData.type;
  console.log(this.type);
  this.getUserDetail()  
}
  getUserDetail(){
   if(!this.type){
    this.connectionService.viewOthersProfile(this.feedData.owner).subscribe(
      (data)=>{
        console.log(data);
        this.userDetail = data;
        this.name = data.name;
        this.getUserdp();
      },
      (error)=>console.log(error)
    );
   }
   else{
    this.connectionService.getocprofile(this.feedData.owner).subscribe(
      (data)=>{
        console.log(data);
        this.userDetail = data;
        this.name = data.title;
      },
      (error)=>console.log(error)
    );
   }
  }
  getUserdp(){
    this.connectionService.getothersdp(this.feedData.owner).subscribe(
      data=> { 
        console.log(data);
          var TYPED_ARRAY = new Uint8Array(data.avtar.data);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
            return data + String.fromCharCode(byte);
            }, '');
          let base64String = btoa(STRING_CHAR);
       
         this.dp = (this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + base64String));
      },
      error => {
        console.log(error);}
    );
  }
  likeIt(){
    console.log("working like");
    this.feedService.likePost(this.feedData._id).subscribe(
      (data)=>{console.log(data);
      this.likes = this.likes+1;
      },
      (error)=>console.log(error)
    );
  }
  
}

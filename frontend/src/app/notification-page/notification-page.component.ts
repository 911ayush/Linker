import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';


@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css']
})
export class NotificationPageComponent implements OnInit {
  notifications:any=[];
  user:any=[];
  count:number=0;
  constructor(private notificationService:NotificationService) {
    this.user=JSON.parse(localStorage.getItem('companiesList'));
    this.getNotification();
   }

  ngOnInit() {
      this.notificationService.getNewnotification().subscribe(
        (data)=>{console.log(data);
        this.notifications.push(data);
        this.count=this.count+1;
        },
        (error)=>console.log(error)
      );
  }
  getNotification(){
    this.notificationService.getTheNotification().subscribe(
      (data)=>{
        console.log(data);
        this.notifications = data;
        this.getInfo();
      },
      (error)=>console.log(error)
    );
  }
  getInfo(){
    for(let i=0;i<this.notifications.length;i++){
      for(let m = 0;m<this.notifications[i].subscribers.length;m++){
        if(localStorage.getItem('id')===this.notifications[i].subscribers[m].subscriber){
          this.count++;
        }
      }
      for(let j=0;j<this.user.length;j++){
        //console.log(j)
        if(this.notifications[i].owner === this.user[j]._id){
          this.notifications[i].name = this.user[j].title;
          break;
        }
      }
      console.log(this.notifications[i].name);
    }
  }
  
}

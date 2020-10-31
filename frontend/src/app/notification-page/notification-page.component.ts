import { Component, OnInit } from '@angular/core';
import { getMatIconNameNotFoundError } from '@angular/material/icon';
import { userInfo } from 'os';
import { ConnectionServiceService } from '../connection-service.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css'],
  providers:[NotificationService]
})
export class NotificationPageComponent implements OnInit {

  constructor(private notificationService: NotificationService ,private connectionService:ConnectionServiceService) { }
  notifications:any;
  user:any;
  ngOnInit(): void {
    this.fetchnotification();
  }
  fetchnotification(){
    this.notificationService.getTheNotification().subscribe(
      (data)=>{console.log(data);
      this.notifications = data
      this.getinfo();
  },
      (error)=>console.log(error)
    );
  }
  getinfo(){
    this.user = JSON.parse(localStorage.getItem('companiesList'));
    for(let i=0;i<this.notifications.length;i++){
      for(let j=0;j<this.user.length;j++){
        if(this.notifications[i].owner == this.user[j]._id){
          this.notifications[i].name = this.user[j].title;
          break;
        }
      }
      console.log(this.notifications[i].name);
    }
  }
}

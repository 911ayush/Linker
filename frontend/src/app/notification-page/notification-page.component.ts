import { Component, OnInit } from '@angular/core';
import { ConnectionServiceService } from '../connection-service.service';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css']
})
export class NotificationPageComponent implements OnInit {

  constructor(private connectionService:ConnectionServiceService) { }

  ngOnInit(): void {
    this.fetchnotification();
  }
  notifications=[];
  fetchnotification(){devnotification
    this.notificationService.getTheNotification().subscribe(
      (data)=>console.log(data),
      (error)=>console.log(error)
    );
  }
}

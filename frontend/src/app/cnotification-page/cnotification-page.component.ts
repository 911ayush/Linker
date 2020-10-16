import { Component, OnInit } from '@angular/core';
import { ConnectionServiceService } from '../connection-service.service';

@Component({
  selector: 'app-cnotification-page',
  templateUrl: './cnotification-page.component.html',
  styleUrls: ['./cnotification-page.component.css']
})
export class CnotificationPageComponent implements OnInit {

  constructor(private connectionService:ConnectionServiceService) { }

  ngOnInit(): void {
    this.fetchdata();
  }
  notifications=[];
  fetchdata(){
    this.connectionService.getcNotification(5).subscribe((data) => {
      console.log(data);
      this.notifications = data;
    });
  }
}

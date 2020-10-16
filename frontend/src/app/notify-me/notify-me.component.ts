import { Component, OnInit } from '@angular/core';
import { ConnectionServiceService } from '../connection-service.service';

@Component({
  selector: 'notify-me',
  templateUrl: './notify-me.component.html',
  styleUrls: ['./notify-me.component.css']
})
export class NotifyMeComponent implements OnInit {

  constructor(private connectionService: ConnectionServiceService) { }
  notifications=[];
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.connectionService.getnotification(5).subscribe((data) => {
      console.log(data);
      this.notifications=data;
    });
  }

}

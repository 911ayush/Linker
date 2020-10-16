import { Component, OnInit } from '@angular/core';
import { ConnectionServiceService } from '../connection-service.service';

@Component({
  selector: 'app-c-network',
  templateUrl: './c-network.component.html',
  styleUrls: ['./c-network.component.css']
})
export class CNetworkComponent implements OnInit {

  constructor(private connectionService: ConnectionServiceService) { }

  ngOnInit(): void {
    this.fetchdata();
  }
  pending=[];
  sent=[];
  fetchdata(){
    this.connectionService.getcnetworkReq(5).subscribe((data) => {
      console.log(data);
      this.pending = data.pending,
      this.sent = data.sent
    });
  }
}

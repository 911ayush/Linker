import { Component, OnInit } from '@angular/core';
import { ConnectionServiceService } from '../connection-service.service';


@Component({
  selector: 'app-dev-network',
  templateUrl: './dev-network.component.html',
  styleUrls: ['./dev-network.component.css']
})
export class DevNetworkComponent implements OnInit {

  constructor(private connectionService: ConnectionServiceService) { }

  ngOnInit(): void {
    this.fetchdata();
  }
  pending=[];
  sent=[];
  fetchdata(){
    // this.connectionService.getnetworkReq(5).subscribe((data) => {
    //   console.log(data);
    //   this.pending = data.pending,
    //   this.sent = data.sent
    // });
  }
}

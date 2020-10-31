import { Component, Input, OnChanges, SimpleChanges,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageServiceService } from '../message-service.service';
import{ ConnectionServiceService } from '../connection-service.service';

@Component({
  selector: 'app-textingground',
  templateUrl: './textingground.component.html',
  styleUrls: ['./textingground.component.css']
})
export class TextinggroundComponent implements OnChanges {
  ownerId;
  message="";
  messages:any=[];
  constructor(private messageService: MessageServiceService,private connectionService:ConnectionServiceService) { 
    
   }
   @Input() f:boolean;
   @Input() user:string;
  ngOnChanges(changes:SimpleChanges){
    console.log(changes);
    this.ownerId = localStorage.getItem('id');
    var ss = [this.ownerId,this.user].sort().join('');
    console.log(ss);
  }
  sendMessage(){
    this.connectionService.tokentest();
    alert(this.user);
  }
  
  
}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  socket:any;
  readonly url:string = "http://localhost:3000";
  constructor() { 
    this.socket = io(this.url);
  }
  

  listen(eventName: String) {
    // return new Observable((subscriber) =>{
    //   this.socket.on(eventName,(data)=>{
    //     subscriber.next(data);
    //   })
    // });
  }
  emit(eventName: string,data:any){
    // this.socket.emit(eventName,data);
  }
}

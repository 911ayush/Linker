import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = "http://localhost:3001/";
  private wsurl = "ws://localhost:3001";
  socket: any;
  constructor(private http: HttpClient) {
    this.socket = io(this.wsurl);
    this.joinroom();
   }
  generatenotific(notifi){
    return this.http.post<any>(`${this.url}compnotifi/new`,notifi)
  }
  getTheNotification(){
    if(localStorage.getItem('As')==="developer"){
      return this.http.get<any>(`${this.url}devnotification`)
    }
    else{
      return this.http.get<any>(`${this.url}compnotifi/new`)
    }
    
  }
  joinroom(){
    
    var id = localStorage.getItem('id')
    console.log(id);
    console.log("done");
    this.socket.emit('join',{room:id});
  }
 

  getNewnotification(){
    let observable = new Observable<{head:string,body:string}>(observer=>{
      this.socket.on('message',(data)=>{
        observer.next(data);
      });
      return () => {this.socket.disconnect(); }
    });
    return observable;
  }
 
}

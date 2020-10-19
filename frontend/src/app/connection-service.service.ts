import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionServiceService {
  private url = "http://localhost:3001/";
  constructor(private http: HttpClient) {}
    registerUser(user){
      console.log(user);
      //return this.http.get<any>("http://localhost:3001/api");

      return this.http.post<any>(`${this.url}devg/signup` ,user);
    }
    loginUser(user){
       console.log(user);
      // return this.http.post<any>(`${this.url}devg/login` ,JSON.stringify(user));
      return this.http.post<any>(`${this.url}devg/login` ,user);
      //return this.http.get<any>(`${this.url}devg/login`);
    }
    loggedIn(){
      return !!localStorage.getItem('token');
    }
    getToken(){
      return localStorage.getItem('token');
    }
    getprofile(id){
      console.log("get profile service works");
      return this.http.get<any>(`${this.url}profile/${id}`);
    }
    getcprofile(id){
      console.log("get cprofile service works");
      return this.http.get<any>(`${this.url}company/profile/${id}`);
    }
    getcNotification(id){
      console.log("get cnotification service works");
      return this.http.get<any>(`${this.url}company/notification/${id}`);
    }
    getnetworkReq(id){
      console.log("get pending service works");
      return this.http.get<any>(`${this.url}network/${id}`);
    }
    getcnetworkReq(id){
      console.log("get pending service works");
      return this.http.get<any>(`${this.url}company/network/${id}`);
    }
    getnotification(id){
      console.log("get pending service works");
      return this.http.get<any>(`${this.url}notification/${id}`);
    }
    uploaddp(formData){
      console.log(formData);
      return this.http.post<any>(`${this.url}profile/changedp`,formData);
    }
    uploadpost(formData,id){
      return this.http.post<any>(`${this.url}post/${id}`,formData); 
    }
}

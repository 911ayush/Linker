import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionServiceService {
  private url = "http://localhost:4000/api/rgister";
  constructor(private http: HttpClient) {}
    registerUser(user){
      console.log(user);
      return this.http.post<any>(this.url ,user);
    }
    loginUser(user){
      console.log(user);
      return this.http.post<any>(this.url ,user);
    }
    loggedIn(){
      return !!localStorage.getItem('token');
    }
    getToken(){
      return localStorage.getItem('token');
    }
}

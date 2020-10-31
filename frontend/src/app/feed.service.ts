import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private url = "http://localhost:3001/";
  constructor(private http: HttpClient) { }
  uploadpost(formData){
    console.log("upload post works")
    return this.http.post<any>(`${this.url}devfeed/post`,formData);
  }
  getFeeds(){
    return this.http.get<any>(`${this.url}devfeed/foreign`); 
  }
  likePost(id){
    console.log("working like");
    return this.http.get<any>(`${this.url}likepost/${id}`);
  }
  getMyDevFeed(){
    console.log("working data");
    return this.http.get<any>(`${this.url}devfeed/getPost`);
  }
  //compont feeds control
  getmyFeedscompony(){
    console.log("working company feeds");
    return this.http.get<any>(`${this.url}compfeed/getPost`);
  }
  uploadpostcompany(formData){
    console.log("working upload feeds");
    return this.http.post<any>(`${this.url}compfeed/post`,formData);
  }
}

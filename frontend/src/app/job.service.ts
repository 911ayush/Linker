import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private url = "http://localhost:3001/";
  constructor(private http:HttpClient) { }
  //managing jobs from company side
  createOpening(data){
    console.log(data);
    return this.http.post<any>(`${this.url}compjob/publish`,data)
  }
  getOngoing(){
    return this.http.get<any>(`${this.url}compjob/status/ongoing`)
  }
  getAll(){
    return this.http.get<any>(`${this.url}compjob/status/all`)
  }
  getAllClosed(){
    return this.http.get<any>(`${this.url}compjob/status/closed`)
  }
  //managing jobs from developer side
  getAllJobs(){
    const httpParams = new HttpParams({
      fromObject:{
        sortBy:'selectedRange_start_desc'
      }
    });
    return this.http.get<any>(`${this.url}devjobs`,{params:httpParams})
  }
  getAppliedJobs(){
    return this.http.get<any>(`${this.url}devjobs/applied`)
  }

  applyforjob(id){
    
    return this.http.get<any>(`${this.url}devjobs/${id}/apply`)
  }
}

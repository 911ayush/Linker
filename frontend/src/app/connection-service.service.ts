import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';
//import{ ResponseContentType } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ConnectionServiceService {
  private url = "http://localhost:3001/";
  constructor(private http: HttpClient) {}
  getCompaniesListasDev(){
    console.log("getCompaniesList");
    return this.http.get<any>(`${this.url}fetchcomp/asDev`)
  }
  getDevelopersListasDev(){
    console.log("getDevelopersList");
    return this.http.get<any>(`${this.url}fetchdeveloper/asDev`)
  }
  getCompaniesList(){
    console.log("getCompaniesList");
    return this.http.get<any>(`${this.url}fetchcomp/asComp`)
  }
  getDevelopersList(){
    console.log("getDevelopersList");
    return this.http.get<any>(`${this.url}fetchdeveloper/asComp`)
  }
  //follow comapny
  followCompany(id){
    console.log("follow the company");
    return this.http.get<any>(`${this.url}compprofile/${id}/subscribe`)
  }



  // options: {
  //   headers?: HttpHeaders | {[header: string]: string | string[]},
  //   observe?: 'body' | 'events' | 'response',
  //   params?: HttpParams|{[param: string]: string | string[]},
  //   reportProgress?: boolean,
  //   responseType?: 'arraybuffer'|'blob'|'json'|'text',
  //   withCredentials?: boolean,
  // }
  //local host 3001 there server
    tokentest(){
      console.log("tokentest workking")
      this.http.get<any>(`${this.url}devtest`).subscribe((data)=>{
        console.log(data);
      });
    }
    
    registerUser(user){
      console.log(user);
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
    //localhost 4000 my server
    
    
    getprofile(){
      console.log("get profile service works");
      return this.http.get<any>(`${this.url}devprofile/read`);
    }
    updateprofile(data){
      console.log("uploade service works");
      return this.http.patch<any>(`${this.url}devproute/update`,data);
    }
    setprofile(data){
      console.log("set profile service works");
      return this.http.post<any>(`${this.url}devprofile/create`,data);
    }
    uploaddp(formData){
      console.log(formData);
      return this.http.post<any>(`${this.url}devprofile/create/avatar`,formData);
    }
    getownerdp(){
     // var httpRequest = new HttpRequest()
     //  var header = new HttpHeaders().set('Content-Type','image/png');
      // //var id = localStorage.getItem('id');
      // console.log("dp fetching");
      // var options = {
      //   responseType: 'arraybuffer' as any,
      // };
      //const options = {headers, params, responseType: 'text' as 'text'};
      return this.http.get<any>(`${this.url}devprofile/myavatar`);
      const httpParams = new HttpParams({
        fromObject:{
        }
      });
     // return this.http.get<any>(`${this.url}devprofile/myavatar`, {resposneType:'arraybuffer'});
    }
    getothersdp(id){
      console.log(id);
      var header = new HttpHeaders().set('Content-Type','image/png');
      return this.http.get<any>(`${this.url}devprofile/${id}/avatar`);
   
       //return this.http.get<any>(`${this.url}devprofile/${id}/avatar`, {responseType: "arraybuffer"});
    }
    
    viewOthersProfile(id){
      console.log("viewothersprofile");
      return this.http.get<any>(`${this.url}devprofile/${id}/read`);
    }
    getjobs(){
      return this.http.get<any>(`${this.url}devjobs`);
    }
    // viewOthersDp(id){
    //   return this.http.get<any>(`${this.url}devprofile/${id}/avatar`,{headers,responseType:'arraybuffer'});
    // }
    followDev(id){
      console.log(id);
      return this.http.get(`${this.url}devproute/${id}/subscribe`);
    }
//not used
    cregisterUser(user){
      console.log(user);
      //return this.http.get<any>("http://localhost:3001/api");
      return this.http.post<any>(`${this.url}compg/signup` ,user);
    }
    cloginUser(user){
      console.log(user);
      return this.http.post<any>(`${this.url}compg/login` ,user);
    }
    getcprofile(){
      console.log("get cprofile service works");
      return this.http.get<any>(`${this.url}compprofile/read`);
    }
    uploadcdp(formData){
      console.log(formData);
      return this.http.post<any>(`${this.url}compprofile/create/image`,formData);
    }
    getcowdp(){
    //  var headers = new HttpHeaders().set('Content-Type','*');
      //var id = localStorage.getItem('id');
      return this.http.get<any>(`${this.url}compprofile/myimage`);
    }
    getothercdp(id){
      return this.http.get<any>(`${this.url}comppprofile/${id}/image`);
    }
    updatecprofile(data){
      console.log("uploade service works");
      return this.http.patch<any>(`${this.url}compprofile/update`,data);
    }
    getocprofile(id){
      return this.http.get<any>(`${this.url}compprofile/${id}/read_only`);
    }
    getoasdevcprofile(id){
      return this.http.get<any>(`${this.url}compprofile/${id}/asdevread_only`);
    }
    getcNotification(id){
      console.log("get cnotification service works");
     // return this.http.get<any>(`${this.url}company/notification/${id}`);
    }
    getnetworkReq(id){
      console.log("get pending service works");
      //return this.http.get<any>(`${this.url}network/${id}`);
    }
    getcnetworkReq(id){
      console.log("get pending service works");
    //  return this.http.get<any>(`${this.url}company/network/${id}`);
    }
    getnotification(id){
      console.log("get pending service works");
      return this.http.get<any>(`${this.url}notification/${id}`);
    }
    
    uploadpost(formData,id){
      return this.http.post<any>(`${this.url}post/${id}`,formData); 
    }
    
    
    
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
//import { type } from 'os';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { MessageServiceService } from '../message-service.service';
import { ConnectionServiceService } from '../connection-service.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-messaging-page',
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.css']
})
export class MessagingPageComponent implements OnInit {
  asss:boolean;
  constructor( private connectionService: ConnectionServiceService,private messageService: MessageServiceService,private domSanitizer:DomSanitizer) {
    if(localStorage.getItem('As')=='company'){
      console.log(localStorage.getItem('As'))
      this.asss=true;
    }
    else{
      console.log(localStorage.getItem('As'))
      this.asss=false;
    }
   }
  
  dpo:any=["./assets/cancer-hospital.jpg","./assets/anonymous.PNG"];
  dpp:any;
  users:any=[];
  userstos:any=[];
  comps:any=[];
  compstos:any=[];
  
  search:string;
  f:boolean;
  user:string;
  //expectedsearch:any=[];
  to:string;
  idto:number;

  ngOnInit() {
    this.getContacts();
  }

  setUser(event){
    console.log(event.target.attributes.id.nodeValue);
    this.user = event.target.attributes.id.nodeValue;
  }
  //developing contact list
  onkeyup(){
    this.userstos=[];
    this.compstos=[];
    for(let i =0;i<this.users.length;i++){
      if(this.users[i].name.toUpperCase().includes(this.search.toUpperCase())){
        console.log(this.users[i]._id);
        this.userstos.push(this.users[i]);
        console.log(this.userstos);
      }
    }
    for(let i =0;i<this.comps.length;i++){
      if(this.comps[i].title.toUpperCase().includes(this.search.toUpperCase())){
        console.log(this.comps[i]._id);
        this.compstos.push(this.comps[i]);
        console.log(this.compstos);
      }
    }
    this.fetchDp();
  }
  fetchDp(){
    console.log("fetchDp deploy");
    //fetching developer's image
    for(let i =0;i<this.userstos.length;i++){
      //console.log(this.userstos[i]._id);
      this.connectionService.getothersdp(this.userstos[i]._id).subscribe(
        data=> { 
          console.log(data);
            var buffdp = data;
            var TYPED_ARRAY = new Uint8Array(data);
            const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
              return data + String.fromCharCode(byte);
              }, '');
            let base64String = btoa(STRING_CHAR);
         
           this.dpp = (this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + base64String));
           this.userstos[i].dpo = this.dpp;
        },
        error => {this.userstos[i].dpo = ("./assets/anonymous.PNG");
          console.log(error);}
      );
    }
  //fetching companies image
    for(let i =0;i<this.compstos.length;i++){
      console.log(this.compstos[i]._id);
      this.connectionService.getothersdp(this.compstos[i]._id).subscribe(
        data=> { 
          console.log(data);
            var buffdp = data;
            var TYPED_ARRAY = new Uint8Array(data);
            const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
              return data + String.fromCharCode(byte);
              }, '');
            let base64String = btoa(STRING_CHAR);
         
           this.dpp = (this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + base64String));
           this.compstos[i].dpo = this.dpp;
        },
        error => {this.compstos[i].dpo = "./assets/anonymous.PNG";
          console.log(error);}
      );
    }
  }
  //getting list of company and developer from localstorage
  getContacts(){
    this.users = JSON.parse(localStorage.getItem("developersList"));
    this.comps = JSON.parse(localStorage.getItem("companiesList"));
    console.log(this.comps);
    this.userstos = this.users;
    this.compstos = this.comps;
    this.fetchDp();
    if(this.users.length!=0){
      this.f = true;
      this.user = this.users[0]._id;
    }
    else if(this.comps.length!=0){
      this.f = true;
      this.user = this.comps[0]._id;
    }
    else{
      this.f = false;
    }
  }
}
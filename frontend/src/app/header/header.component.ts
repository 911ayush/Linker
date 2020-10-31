import { Component, OnInit } from '@angular/core';
import { ConnectionServiceService } from '../connection-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search="";
  dpo:any=["./assets/cancer-hospital.jpg","./assets/anonymous.PNG"];
  dpp:any;
  users:any=[];
  userstos:any=[];
  comps:any=[];
  compstos:any=[];
  constructor(private router:Router, private connectionService: ConnectionServiceService,private domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.initlist();
  }
  nevigateToDevById(event){
    console.log("yes called");
    console.log(event.target.attributes.id.nodeValue);
    var gg = event.target.attributes.id.nodeValue;
    this.router.navigate(['/dev/',gg]);
  }
  nevigateToCompById(event){
    console.log("yes called");
    //console.log(event.target.attributes.id.nodeValue);
    var gg = event.target.attributes.id.nodeValue;
    this.router.navigate(['/company/',gg]);
  }
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
            var TYPED_ARRAY = new Uint8Array(data.avtar.data);
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
      this.connectionService.getothercdp(this.compstos[i]._id).subscribe(
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
  opensearchresult(){
    this.users=JSON.parse(localStorage.getItem("developersList"));
    this.comps = JSON.parse(localStorage.getItem("companiesList"));
    console.log(this.comps);
    document.getElementById('sidesearchreasult').style.display="block";
  }
  hidesearchresult(){
    document.getElementById('sidesearchreasult').style.display="none";
  }
  initlist(){
    console.log("initlistdeployed");
    if(!localStorage.getItem('companiesList')){
      this.connectionService.getCompaniesListasDev().subscribe(
        data=>{ 
          console.log(data);
          localStorage.setItem("companiesList", JSON.stringify(data));
          var date = new Date()
          var timestamp = date.getTime()
          //console.log(date.getTime());
          localStorage.setItem("companiesListAppendTime",JSON.stringify(timestamp));
        }
      );
    }
    else{
      var timestamp = JSON.parse(localStorage.getItem("companiesListAppendTime"));
      var date = new Date()
      var ptimestamp = date.getTime()
      if((ptimestamp-30000)<timestamp){
        console.log(ptimestamp-timestamp);
      }
      else{
        this.connectionService.getCompaniesListasDev().subscribe(
          data=>{ 
            console.log(data);
            localStorage.setItem("companiesList", JSON.stringify(data));
            var date = new Date()
            var timestamp = date.getTime()
            //console.log(date.getTime());
            localStorage.setItem("companiesListAppendTime",JSON.stringify(timestamp));
          }
        );
      }
    }
    if(!localStorage.getItem('developersList')){
      this.connectionService.getDevelopersListasDev().subscribe(
        data=>{ 
          console.log(data);
          localStorage.setItem("developersList", JSON.stringify(data));
          var date = new Date()
          var timestamp = date.getTime()
          //console.log(date.getTime());
          localStorage.setItem("developersListAppendTime",JSON.stringify(timestamp));
        }
      );
    }
    else{
      var timestamp = JSON.parse(localStorage.getItem("developersListAppendTime"));
      var date = new Date()
      var ptimestamp = date.getTime()
      if((ptimestamp-30000)<timestamp){
        console.log(ptimestamp-timestamp);
      }
      else{
        this.connectionService.getDevelopersListasDev().subscribe(
          data=>{ 
            console.log(data);
            localStorage.setItem("developersList", JSON.stringify(data));
            var date = new Date()
            var timestamp = date.getTime()
            //console.log(date.getTime());
            localStorage.setItem("developersListAppendTime",JSON.stringify(timestamp));
          }
        );
      }
    }
  }
}
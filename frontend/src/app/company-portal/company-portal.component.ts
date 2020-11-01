import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ConnectionServiceService } from '../connection-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-company-portal',
  templateUrl: './company-portal.component.html',
  styleUrls: ['./company-portal.component.css']
})
export class CompanyPortalComponent implements OnInit {
  dpo:any="../assets/anonymous.PNG";
  dcd;
  abou:boolean=false;
  bskill:boolean=false;
  //binterest:boolean=false;
  image;
  title="";
  titletoc="";
  about="";
  abouttoc="";
  address=""
  //intresttoc="";
  skilltoc="";
  addresstoc="";
  lookup:string[]=[];
  lookuptoc:string[]=[];
  // intrests:string[]=[];
  // intreststoc:string[]=[];
  
  url = "";
  skill(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lookup, event.previousIndex, event.currentIndex);
  }
  
  constructor(private connectionService:ConnectionServiceService,private domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.fetchData();
    this.getdp();
  }
  fetchData(){
    this.connectionService.getcprofile().subscribe((data) => {
      console.log(data);
      this.title = data.title;
      this.titletoc = data.title;
      this.about = data.about;
      this.abouttoc = data.about;
      this.lookup = data.lookup;
      while(this.lookuptoc.length){
        this.lookuptoc.pop();
      }
      for(var va of this.lookup){
        this.lookuptoc.push(va);
      }
      if(data.lookup.length){
        this.bskill=true;
      }
      else{
        this.bskill=false;
      }
      if(data.about){
        this.abou=true;
      }
      else{
        this.abou=false;
      }
      this.address = data.address;
    });
  }
  selectImage(event){
    if(event.target.files.length>0){
      if(event.target.files){
      }
      const file = event.target.files[0];
      this.image = file; 
    }
    this.preprev(event);
    document.getElementById('dpcb').style.display="block";
  }
  preprev(e){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url = event.target.result;
      }
    }
  }
  uploaddp(){
    const formData = new FormData();
    formData.append('image',this.image);
    this.connectionService.uploadcdp(formData).subscribe(
      (res)=> {
        document.getElementById('dpcb').style.display="none";
      },

      (err)=> {console.log(err);
        document.getElementById('dpcb').style.display="none";
      }
      );
      setTimeout(()=>{
        this.getdp();
      },2000);
  }
  getdp(){
    console.log("get dp");
    var id = localStorage.getItem('id');
    this.connectionService.getcowdp().subscribe(
      data=> { 
        console.log(data);
          var buffdp = data;
          var TYPED_ARRAY = new Uint8Array(data.avatar.data);
          const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
            return data + String.fromCharCode(byte);
            }, '');
          let base64String = btoa(STRING_CHAR);
       
         this.dpo = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64, ' + base64String);

        //  var buffer = new ArrayBuffer(64);
        //  buffer = data;
          //console.log(new Blob([data]));
        // }
      },
      error => console.log(error.error)
    );
  }
  backdpcb(){
    document.getElementById('dpcb').style.display="none";
  }
  openeditcomponent(){
    document.getElementById('editcompo').style.display="block";
    document.getElementById('name').style.display="block";
    document.getElementById('location').style.display="none";
    document.getElementById('skills').style.display="none";
    document.getElementById('interest').style.display="none";
  }
  backeditcompo(){
    while(this.lookuptoc.length){
      this.lookuptoc.pop();
    }
    for (var i of this.lookup) {
      this.lookuptoc.push(i);
    }
    this.titletoc = this.title;
    this.addresstoc = this.address;
    document.getElementById('editcompo').style.display="none";
  }
  opname(){
    document.getElementById('name').style.display="block";
    document.getElementById('location').style.display="none";
    document.getElementById('skills').style.display="none";
    document.getElementById('interest').style.display="none";
  }
  oplocation(){
    document.getElementById('name').style.display="none";
    document.getElementById('location').style.display="block";
    document.getElementById('skills').style.display="none";
    document.getElementById('interest').style.display="none";
  }
  opskills(){
    document.getElementById('name').style.display="none";
    document.getElementById('location').style.display="none";
    document.getElementById('skills').style.display="block";
    document.getElementById('interest').style.display="none";
  }
  opinterest(){
    document.getElementById('name').style.display="none";
    document.getElementById('location').style.display="none";
    document.getElementById('skills').style.display="none";
    document.getElementById('interest').style.display="block";
  }

  appendSkill(){
    this.lookuptoc.push(this.skilltoc);
    this.skilltoc="";
  }
  delSkill(event){
    this.lookuptoc.splice(this.lookuptoc.indexOf(event.target.attributes.id.nodeValue),1);
    console.log(this.lookuptoc);
  }
  saveedits(){
      var data={
        'address':this.addresstoc,
        "about":this.abouttoc,
        "lookup":this.lookuptoc 
      }
      console.log(data);
      this.connectionService.updatecprofile(data).subscribe(() => {
        this.fetchData();
        //alert(response.status)
       }) ;
    document.getElementById('aboutedit').style.display="none";
    document.getElementById('editcompo').style.display="none";
    
  }
  backeditabout(){
    document.getElementById('aboutedit').style.display="none";
  }
  openeditabout(){
    document.getElementById('aboutedit').style.display="block";
  }
}

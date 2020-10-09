import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-log-company',
  templateUrl: './sign-log-company.component.html',
  styleUrls: ['./sign-log-company.component.css']
})
export class SignLogCompanyComponent implements OnInit {
  email:any;
  password:any;
  Cpassword:any;
  constructor() { }
  
  ngOnInit(): void {
  }
 
  logIn(event){
    event.preventDefault;
    const target = event.target;
    this.email = target.querySelector('#email').value;
    this.password = target.querySelector('#password').value;
  }
  signUp(event){
    event.preventDefault;
    const target = event.target;
    this.email = target.querySelector('#email').value;
    this.password = target.querySelector('#password').value;
    this.Cpassword = target.querySelector('#confirPassword').value;
  }
  headTologForm(){
   
    document.getElementById('logIn-form').style.display = "block";
    document.getElementById('signUp-form').style.display = "none";
    document.getElementById('sign-tag').style.backgroundColor = "white";
    document.getElementById('log-tag').style.backgroundColor = "whitesmoke";

  }
  headTosignForm(){
    
    document.getElementById('logIn-form').style.display = "none";
    document.getElementById('signUp-form').style.display = "block";
    document.getElementById('sign-tag').style.backgroundColor = "whitesmoke";
    document.getElementById('log-tag').style.backgroundColor = "white";
  }
}

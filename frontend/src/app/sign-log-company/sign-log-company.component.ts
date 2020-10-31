import { Component, OnInit } from '@angular/core';
import { ConnectionServiceService } from '../connection-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-log-company',
  templateUrl: './sign-log-company.component.html',
  styleUrls: ['./sign-log-company.component.css']
})
export class SignLogCompanyComponent implements OnInit {
  registerUserData:any={};
  loginUserData:any= {};
  constructor(private authService:ConnectionServiceService,private router:Router) { }
  
  ngOnInit(): void {
  }
  logIn(){
    
    this.authService.cloginUser(this.loginUserData)
      .subscribe(
        res => {
       //   console.log(res);
          localStorage.setItem('token',res.logToken);
          localStorage.setItem('id',res.comp._id);
         //console.log(res.logToken);
         localStorage.setItem('As',"company");
          this.router.navigate(['/company']);
        },
        err => console.log(err)
      );
  }
 
  signUp(){
    if(this.registerUserData.password === this.registerUserData.confirmPassword){
      this.authService.cregisterUser(this.registerUserData)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    );
    }
    else{
      alert("not same");
    }
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

//import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { ConnectionServiceService } from "../connection-service.service";
import { Router} from '@angular/router'; 
// import { NgModule } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-log',
  templateUrl: './sign-log.component.html',
  styleUrls: ['./sign-log.component.css']
})
export class SignLogComponent{
  registerUserData:any={};
  loginUserData:any= {};

  constructor(private socualAuthService: SocialAuthService,private router: Router,private authService: ConnectionServiceService) { }
  signInWithGoogle(): void {
    this.socualAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.socualAuthService.signOut();
  }
 
  logIn(){
    alert("yoo");
    this.authService.loginUser(this.loginUserData)
      .subscribe(
        res => {
          alert("yupp");
          console.log(res);
          localStorage.setItem('token',res.logToken);
          this.router.navigate(['/dev/feed'])
        },
        err => console.log(err)
      );
  }
  signUp(){
    if(this.registerUserData.password === this.registerUserData.confirmPassword){
      this.authService.registerUser(this.registerUserData)
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
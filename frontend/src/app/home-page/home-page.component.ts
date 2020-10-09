import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  signUp(){
    alert("signup");
  }
  logIn(){
    alert("log In");
  }
  CompanySignUp(){
    alert("company portal signup");
  }
  DeveloperSignUp(){
    alert("developer portal signup");
  }
}

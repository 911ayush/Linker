import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ConnectionServiceService } from './connection-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
//export class AuthGuard{
  constructor(private authservice: ConnectionServiceService,private router: Router){}
  canActivate():boolean{
    if (this.authservice.loggedIn()){
      return true
    }else{
      this.router.navigate(['/'])
      return false
    }    
  }
   
}

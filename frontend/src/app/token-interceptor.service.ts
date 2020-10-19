import { Injectable,Injector } from '@angular/core';
import { from } from 'rxjs';
import { HttpInterceptor } from '@angular/common/http';
import { ConnectionServiceService } from './connection-service.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(req, next){
    let authService = this.injector.get(ConnectionServiceService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}

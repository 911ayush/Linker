import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ErrorHendlerService implements ErrorHandler {

  handleError(error:any):void{
    if(error instanceof HttpErrorResponse){
      if(error.status === 409){
        window.location.assign('/');
      }
      else{
        console.log(error);
      }
    }
  }
}

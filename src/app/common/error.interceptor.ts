import { ApiError } from './../models/api-error.model';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError( (err:HttpErrorResponse) => {
        if ( err.status == 432 ){
          // maybe handle referently?
        }
        // console.log(err.error);
        if ( err.error?.description )
          return throwError(err.error);
        return throwError( new ApiError("Error while connecting to server"));
      }));
  }
}

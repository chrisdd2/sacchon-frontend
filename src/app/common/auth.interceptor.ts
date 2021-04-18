import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ( this.auth.isLoggedIn() ){
      if( this.auth.user && this.auth.user.auth_token ) // should never be false inside here 
        request = request.clone({
          setHeaders: {
            Authorization: `Basic ${this.auth.user.auth_token}`
          }
        });
    }
    return next.handle(request);
  }
}

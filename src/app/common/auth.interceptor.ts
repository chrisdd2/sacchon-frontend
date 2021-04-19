import { AuthService } from './../services/auth.service';
import { Injectable, Optional, SkipSelf } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, @SkipSelf() @Optional() me:AuthInterceptor) {
    console.log(me);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isLoggedIn()) {
      if( this.auth.user && this.auth.user.authToken)
        request = request.clone({
          setHeaders: {
            Authorization: `Basic ${this.auth.user.authToken}`
          }
        });
    }
    return next.handle(request);
  }
}

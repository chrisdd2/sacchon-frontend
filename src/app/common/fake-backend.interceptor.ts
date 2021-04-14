import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, pipe, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { mergeMap } from 'rxjs/operators';


const users : User[]=[
  { firstName: "christos-patient",lastName: "damianidis", email:"patient@gmail.com",role:"patient",auth_token:"token-patient",expires_at:Number.MAX_VALUE},
  { firstName: "christos-doctor",lastName: "damianidis", email:"doctor@gmail.com",role:"doctor",auth_token:"token-doctor",expires_at:Number.MAX_VALUE},
  { firstName: "christos-reporter",lastName: "damianidis", email:"reporter@gmail.com",role:"doctor",auth_token:"token-reporter",expires_at:Number.MAX_VALUE}
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return of(null).pipe(mergeMap(() => this.handleRequest(request,next)));
  }
  wrap(v:any ){
    return of( new HttpResponse({status:200,body: v}))
  }
  handleRequest(request,next): Observable<HttpEvent<unknown>>{
    if( request.url.endsWith('/api/login') && request.method == 'POST') {
      const { usr, pwd } = request.body as any;
      const user = users.find( u => usr == u.email );
      if( user )
        return this.wrap(user);
      return throwError({error:`user ${usr} not found`});
    }
    return next.handle(request);
  }
}

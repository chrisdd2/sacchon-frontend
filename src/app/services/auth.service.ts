import { SignUpForm } from './../common/api-info';
import { HttpClient } from '@angular/common/http';
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ApiRoutes } from "../common/api-info";


export type SignUpFields = {
  firstName: string;
  lastName: string;
  email: string;
  passwod: string;
  type: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: BehaviorSubject<User>;

  constructor(private http: HttpClient, @Optional() @SkipSelf() auth: AuthService) {
    this._user = new BehaviorSubject<User>(this.getUserFromStorage());
  }

  public get user(): User {
    return this._user.value;
  }

  public get userSubject(): BehaviorSubject<User> {
    return this._user;
  }


  public signUp(form:SignUpForm): Observable<any> {
    return this.http.post<User>(ApiRoutes.signup,form)
      .pipe(
        map(user => {
          this.userSubject.next(user)
          sessionStorage.setItem('sacchon-user', JSON.stringify(user));
          return user;
        })
      )
  }


  public logIn(usr: string, pwd: string): Observable<any> {
    const loginUrl = "/api/login";
    if (this.isLoggedIn())
      return throwError({ description: 'Already logged in' }); 
    return this.http.post<User>(ApiRoutes.login, { username: usr, password: pwd })
      .pipe(
        map(user => {
          this.userSubject.next(user);
          sessionStorage.setItem('sacchon-user', JSON.stringify(user));
          return user;
        })
      );
  }
  public logOut() {
    this.userSubject.next(null);
    this.clearUserStorage();
  }

  public isLoggedIn(): boolean {
    if (!this.user)
      return false;
    if (this.isSessionExpired(this.user)) {
      this.clearUserStorage();
      return false;
    }
    return true;
  }

  public getHomeRoute(): string {
    switch (this.user.role) {
      case "patient": return "/patient";
      case "doctor": return "/doctor";
      case "reporter": return "/reporter";
      default: "/";
    }
  }

  private isSessionExpired(user: User): boolean {
    return Date.now() > user.expires_at;
  }

  private getUserFromStorage(): User {
    const user: User = JSON.parse(sessionStorage.getItem('sacchon-user'));
    if (!user)
      return null;
    if (this.isSessionExpired(user)) {
      this.clearUserStorage();
      return null;
    }
    return user;
  }

  private clearUserStorage() {
    sessionStorage.removeItem("sacchon-user");
  }

}


import { ApiRoutes } from './../common/api-info';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reporter } from '../models/reporter.model';

export interface ReporterPatient{
  id:number;
  fullName:string;
  email:string;
}


@Injectable({
  providedIn: 'root'
})
export class ReporterService {

  reporter: BehaviorSubject<Reporter>;

  constructor(private http: HttpClient) {
    this.reporter = new BehaviorSubject(null);
  }

  refreshInfo(){
    this.http.get<Reporter>(ApiRoutes.reporter.info).subscribe(
      res => this.reporter.next(res), er => console.log("reporter: refreshInfo " + er));
  }

  searchPatient(email:string){
    return this.http.get<ReporterPatient>(ApiRoutes.reporter.patient.search, { params: new HttpParams().append("email",email)});
  }



}

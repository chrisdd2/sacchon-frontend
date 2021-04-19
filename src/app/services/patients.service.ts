import { map, retry, shareReplay } from 'rxjs/operators';
import { ApiRoutes } from './../common/api-info';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patients } from '../models/patients.model';
import { Patient } from '../models/patient.model';


export type AvgItem = { value:number};

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patient:Patient;


  constructor(private http:HttpClient) { }

  getData(): Patients[]{
    return [
      new Patients("id1","pname1","cons1"),
    new Patients("id2","pname2","cons2")
  ]
  }

  getPatientInfo( ){
    if ( this.patient )
      return of(this.patient);
    return this.http.get<Patient>(ApiRoutes.patient.info).pipe(
      map( p=> {this.patient=p; console.log(p); return p}),
      shareReplay(),
      retry(3),
    );
  }

  getPatientAvg(type:string,start:Date,end:Date){
    const params:HttpParams = new HttpParams();
    let route;
    if ( type == "carb" )
      route = ApiRoutes.patient.carb;
    if ( type == "carb" )
      route = ApiRoutes.patient.glucose;
    params.set('type',type);
    if ( start )
      params.set('date_start',start.toISOString().substr(0,10));
    if( end) 
      params.set('date_end',end.toISOString().substr(0,10));
    return this.http.get<AvgItem>(route,{ params: params}).pipe(shareReplay());

  }
}

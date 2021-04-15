import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/patient.model';


export const dataRoutes= {
  'patient-info': environment.apiUrl + '/patient/info',
  'patient-avg': environment.apiUrl + '/patient/avg'
}
export const headers= new HttpHeaders().set('Content-type','application/json');

export type AvgItem = { 
  avg:number;
  date?:Date;
  date_start?:Date;
  date_end?:Date;
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getPatientInfo():Observable<Patient>{
    return this.http.get<Patient>(dataRoutes['patient-info'],{headers:headers})
    .pipe(shareReplay())
  }
  getPatientAvg(type:string,date_start:number,date_end:number):Observable<AvgItem>{
    const params:HttpParams = new HttpParams();
    params.set('type',type);
    params.set('date_start',date_start.toString());
    params.set('date_end',date_end.toString());
    return this.http.get<AvgItem>(dataRoutes['patient-avg'],{ params: params, headers: headers}).pipe(shareReplay());
  }
}

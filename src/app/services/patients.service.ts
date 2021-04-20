import { map, retry, shareReplay } from 'rxjs/operators';
import { ApiRoutes, RecordCounts, CarbForm } from './../common/api-info';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patients } from '../models/patients.model';
import { Patient } from '../models/patient.model';


export type AvgItem = { value: number };

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patient: Patient;


  constructor(private http: HttpClient) { }

  getData(): Patients[] {
    return [
      new Patients("id1", "pname1", "cons1"),
      new Patients("id2", "pname2", "cons2")
    ]
  }

  getPatientInfo() {
    if (this.patient)
      return of(this.patient);
    return this.http.get<Patient>(ApiRoutes.patient.info).pipe(
      map(p => { this.patient = p; console.log(p); return p }),
      shareReplay(),
      retry(3),
    );
  }

  getPatientAvg(type: string, start: Date, end: Date) {
    let route;
    if (type == "carb")
      route = ApiRoutes.patient.avg.carb;
    else if (type == "glucose")
      route = ApiRoutes.patient.avg.glucose;
    else
      console.log("wrong call to avg");
    let params = new HttpParams();
    if ( start )
        params = params.append("start",start.toISOString().substr(0, 10));
    if ( end )
        params = params.append("end",end.toISOString().substr(0, 10));
    return this.http.get<AvgItem>(route, {params});
  }
  getCarbGlucoseCount(){
    return this.http.get<RecordCounts>(ApiRoutes.patient.count);
  }

  postCarb(frm:CarbForm){
    return this.http.post(ApiRoutes.patient.carb,{carbIntake:frm.carbIntake,date: frm.date.toISOString().substr(0,10)});
  }
}

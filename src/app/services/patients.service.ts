import { map, retry, shareReplay } from 'rxjs/operators';
import { ApiRoutes, RecordCounts, CarbForm, GlucoseForm } from './../common/api-info';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patients } from '../models/patients.model';
import { Patient } from '../models/patient.model';
import { getDateString } from '../shared/util';


export type AvgItem = { value: number };

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patient:BehaviorSubject<Patient>;


  constructor(private http: HttpClient) { 
    this.patient = new BehaviorSubject<Patient>(null);
  }



  getData(): Patients[] {
    return [
      new Patients("id1", "pname1", "cons1"),
      new Patients("id2", "pname2", "cons2")
    ]
  }

  getPatientInfo() {
    this.http.get<Patient>(ApiRoutes.patient.info).subscribe(
      p => { this.patient.next(p); }
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
    if (start)
      params = params.append("start", getDateString(start));
    if (end)
      params = params.append("end", getDateString(end));
    return this.http.get<AvgItem>(route, { params });
  }
  getCarbGlucoseCount() {
    return this.http.get<RecordCounts>(ApiRoutes.patient.count);
  }
  putGlucose(frm: GlucoseForm ){
    return this.http.put(ApiRoutes.patient.glucose,{ id:frm.id ,glucoseLevel: frm.glucoseLevel, date : getDateString(frm.date),time: frm.time});
  }

  deleteGlucose(id:number){
    return this.http.delete(ApiRoutes.patient.glucose,{ params: new HttpParams().set("id",id.toString())});
  }
  
  postGlucose(frm: GlucoseForm ){
    return this.http.post(ApiRoutes.patient.glucose,{ glucoseLevel: frm.glucoseLevel, date : getDateString(frm.date),time: frm.time});
  }
  
  putCarb(frm: CarbForm) {
    return this.http.put(ApiRoutes.patient.carb, { id:frm.id,carbIntake: frm.carbIntake, date: getDateString(frm.date) });
  }

  postCarb(frm: CarbForm) {
    return this.http.post(ApiRoutes.patient.carb, { carbIntake: frm.carbIntake, date: getDateString(frm.date) });
  }
  deleteCarb(id:number){
    return this.http.delete(ApiRoutes.patient.carb,{ params: new HttpParams().set("id",id.toString())});
  }
  postNotified(){
    console.log("post notified");
    this.http.post(ApiRoutes.patient.notified,"").subscribe();
  }
  hasNotification(): boolean {
    const patient = this.patient.value;
    if( !patient )
      return false;
    if (patient.consultationStatus) {
      return patient.consultationStatus == "UPDATED" || patient.consultationStatus == "NEW";
    }
    return false;
  }
  getNotificationMessage(): string {
    if( !this.patient.value )
      return "Empty status";
    switch (this.patient.value.consultationStatus) {
      case "UPDATED":
        return "You consultant updated your latest consultation";
      case "NEW":
        return "You have a new consultation!";
      default:
        return "No status from database ( inform an admin )";
    }
  }
}

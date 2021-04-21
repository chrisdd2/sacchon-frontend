import { ConsultationForm } from './../common/api-info';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiRoutes } from '../common/api-info';
import { Doctor } from '../models/doctor.model';
import { getDateString } from '../shared/util';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  doctor:BehaviorSubject<Doctor>;

  constructor(private http: HttpClient) {
    this.doctor = new BehaviorSubject(null);
  }

  refreshInfo(){
    this.http.get<Doctor>(ApiRoutes.doctor.info).subscribe(
      res => this.doctor.next(res), er => console.log("doctor: refreshInfo " + er));
  }
  postConsult(frm:ConsultationForm){
    return this.http.post(ApiRoutes.doctor.consultation, { id:frm.id, date:getDateString(frm.date), text:frm.text});
  }
  putConsult(frm:ConsultationForm){
    return this.http.put(ApiRoutes.doctor.consultation, { id:frm.id, date:getDateString(frm.date), text:frm.text});
  }
}

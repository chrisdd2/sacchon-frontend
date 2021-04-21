import { Consultation } from './../models/consultation.model';
import { CarbRecord, GlucoseRecord } from './../models/patient.fields.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutes } from '../common/api-info';
import { FieldSupplier } from './field-supplier';



@Injectable({
  providedIn: 'root'
})
export class PatientFieldsService {

  carb: FieldSupplier<CarbRecord>;
  glucose: FieldSupplier<GlucoseRecord>;
  consultations: FieldSupplier<Consultation>;

  constructor(private http: HttpClient) {
    this.carb = new FieldSupplier(http, ApiRoutes.patient.carb, new HttpParams());
    this.glucose = new FieldSupplier(http, ApiRoutes.patient.glucose, new HttpParams());
    this.consultations = new FieldSupplier(http, ApiRoutes.patient.consult, new HttpParams());
  }

}

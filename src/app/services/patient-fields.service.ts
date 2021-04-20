import { NotLoggedGuard } from './../common/notlogged.guard';
import { LayoutModule } from '@angular/cdk/layout';
import { CarbRecord, GlucoseRecord } from './../models/patient.fields.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiRoutes } from '../common/api-info';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


type Field<T> = {
  data: T[]
  reached: boolean;
  obs: BehaviorSubject<T[]>
}

@Injectable({
  providedIn: 'root'
})
export class PatientFieldsService {

  carb: Field<CarbRecord>
  glucose: Field<GlucoseRecord>

  limit = 50;

  constructor(private http: HttpClient) {
    this.carb = { data: [],reached:false,obs : new BehaviorSubject<CarbRecord[]>(null)};
    this.glucose = { data: [],reached:false,obs : new BehaviorSubject<GlucoseRecord[]>(null)};
  }

  glucoseObs(): BehaviorSubject<GlucoseRecord[]> { return this.glucose.obs; }
  carbObs(): BehaviorSubject<CarbRecord[]> { return this.carb.obs; }

  getMoreCarbs() {
    this.getMoreField(this.carb,ApiRoutes.patient.carb);
  }
  getMoreGlucose() {
    this.getMoreField(this.glucose,ApiRoutes.patient.glucose);
  }
  refreshCarbs() {
    this.refreshField(this.carb,ApiRoutes.patient.carb);
  }
  refreshGlucose() {
    this.refreshField(this.glucose,ApiRoutes.patient.glucose);
  }


  private refreshField<T> ( field:Field<T>,route:string ){
    if( field.reached)
      field.reached=false;
    this.getData(route,res=>{
      if( !res )
        return;
      if( res.length == 0 )
        field.reached=true;
      else
        field.data=res;
      field.obs.next(field.data);
    },0);
  }

  private getMoreField<T> ( field:Field<T>,route:string ){
    if( !field.data )
      field.data = [];
    this.getData(route,res=>{
      if( !res )
        return;
      if( res.length == 0 )
        field.reached=true;
      else
        field.data.push(res);
      field.obs.next(field.data);
    },0);
  }

  private getData(route: string, cb, offset: number) {
    const params = new HttpParams().set("offset", offset.toString()).set("limit", this.limit.toString());
    console.log(params);
    this.http.get<CarbRecord[]>(route, { params }).subscribe(
      cb,
      (err) => console.log(err)
    );
  }
}
import { PatientItem } from './../../services/reporter.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { ApiRoutes } from 'src/app/common/api-info';
import { FieldSupplier } from 'src/app/services/field-supplier';
import { DoctorItem } from 'src/app/services/reporter.service';
import { FieldTableDefinitions } from 'src/app/shared/fieldtable/fieldtable.component';
import {  resetFieldWithDates } from 'src/app/shared/util';

@Component({
  selector: 'sacchon-reporter-activity',
  templateUrl: './reporter-activity.component.html',
  styleUrls: ['./reporter-activity.component.scss']
})
export class ReporterActivityComponent implements OnInit,OnDestroy {


  doctorSupplier: FieldSupplier<DoctorItem>;
  doctorRecords: MatTableDataSource<DoctorItem>
  patientSupplier: FieldSupplier<PatientItem>;
  patientRecords: MatTableDataSource<PatientItem>

  fields:FieldTableDefinitions[]=[
    // { name: "id",value:v=>v.id,label:"Id"},
    { name: "name", value: v=>v.fullName,label:"Name" },
    { name: "Email",value:v=>v.email,label:"Email"}
  ];
  doctorSub:Subscription;
  patientSub:Subscription;

  constructor(private http:HttpClient,
    private snackBar:MatSnackBar) {

   }

  ngOnInit(): void {
    this.doctorSupplier = new FieldSupplier(this.http,ApiRoutes.reporter.doctor.activity,new HttpParams());
    this.doctorRecords = new MatTableDataSource([]);
    this.doctorSub = this.doctorSupplier.observable().subscribe( c => this.doctorRecords.data = c);
    this.patientSupplier = new FieldSupplier(this.http,ApiRoutes.reporter.patient.activity,new HttpParams());
    this.patientRecords = new MatTableDataSource([]);
    this.patientSub = this.patientSupplier.observable().subscribe( c => this.patientRecords.data = c);
    this.doctorSupplier.refresh();
  }
  ngOnDestroy():void{
    this.doctorSub.unsubscribe();
    this.patientSub.unsubscribe();
  }

  onDateChange<T>(supplier:FieldSupplier<T>, v:{start:Date,end:Date}){
    console.log(v);
    resetFieldWithDates(supplier,{},v);
    supplier.refresh();
  }
   
  onTabChange(event :MatTabChangeEvent){
    if( event.index == 0 ){
      this.doctorSupplier.refresh();
    }
    else if(event.index == 1){
      this.patientSupplier.refresh();
    }
    else
      console.log("this should not happen");
  }
}

import { ConsultDialogData } from './../doctor-consult-add/doctor-consult-add.component';
import { DialogData } from './../patient-view/patient-view.component';
import { Consultation } from './../../models/consultation.model';
import { MatDialog } from '@angular/material/dialog';
import { ApiRoutes } from './../../common/api-info';
import { MatTableDataSource } from '@angular/material/table';
import { PatientItem } from './../../services/reporter.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FieldSupplier } from 'src/app/services/field-supplier';
import { FieldTableDefinitions } from 'src/app/shared/fieldtable/fieldtable.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { PatientViewComponent } from '../patient-view/patient-view.component';
import { DoctorConsultAddComponent } from '../doctor-consult-add/doctor-consult-add.component';

@Component({
  selector: 'sacchon-doctor-medical',
  templateUrl: './doctor-medical.component.html',
  styleUrls: ['./doctor-medical.component.scss']
})
export class DoctorMedicalComponent implements OnInit {


  consulted: FieldSupplier<PatientItem>;
  pending: FieldSupplier<PatientItem>;
  consults: FieldSupplier<Consultation>;

  patientFields: FieldTableDefinitions[] = [
    // { name: "id",value:v=>v.id,label:"Id"},
    { name: "name", value: v => v.fullName, label: "Full name" },
    { name: "email", value: v => v.email, label: "Email" }
  ];
  consultsFields: FieldTableDefinitions[] = [
    // { name: "id",value:v=>v.id,label:"Id"},
    { name: "name", value: v=> v.patientName,label:"Patient name"},
    { name: "text",value:v=>v.consultationText,label:"Consultation"},
    { name: "date",value:v=>v.date,label:"Date"},
    { name: "expires",value:v=>v.expirationDate,label:"Valid until"}
  ];

  consultedRecords: MatTableDataSource<PatientItem>;
  pendingRecords: MatTableDataSource<PatientItem>;
  consultsRecords: MatTableDataSource<Consultation>;

  consultedSub:Subscription;
  pendingSub:Subscription;
  consultsSub:Subscription;


  constructor(private http:HttpClient,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.consulted = new FieldSupplier(this.http,ApiRoutes.doctor.patient.list,new HttpParams());
    this.pending = new FieldSupplier(this.http,ApiRoutes.doctor.pending,new HttpParams());
    this.consults = new FieldSupplier(this.http,ApiRoutes.doctor.consultationlist,new HttpParams());

    this.consultedRecords = new MatTableDataSource([]);
    this.pendingRecords = new MatTableDataSource([]);
    this.consultsRecords = new MatTableDataSource([]);

    this.consultedSub=this.consulted.observable().subscribe( c => this.consultedRecords.data=c);
    this.pendingSub=this.pending.observable().subscribe( c => this.pendingRecords.data=c);
    this.consultsSub=this.consults.observable().subscribe( c => this.consultsRecords.data=c);
    this.consulted.refresh();
  }

  ngOnDestroy():void{
    this.consultedSub.unsubscribe();
    this.consultsSub.unsubscribe();
    this.pendingSub.unsubscribe();
  }

  onTabChange(event: MatTabChangeEvent) {
    switch (event.tab.textLabel.toLowerCase()) {
      case "consulted patients":
        this.consulted.refresh();
        break;
      case "pending consultation patients":
        console.log("refresh");
        this.pending.refresh();
        break;
      case "consultations":
        this.consults.refresh();
      default:
        console.log("this should not happen " + event.tab.textLabel);
    }
  }

  onConsultedView(record){
    this.dialog.open(PatientViewComponent,{data: <DialogData>{ patient:record}})
  }
  onPendingView(record){
    this.dialog.open(PatientViewComponent,{data: <DialogData>{ patient:record,consultation:true}}).afterClosed().subscribe(
      res => {
        if( res)
          this.showAddConsult(record);
      }
    )
  }

  showAddConsult(record){
    this.dialog.open(DoctorConsultAddComponent, {data: <ConsultDialogData>{ id: record.id,consult:null}}).afterClosed().subscribe(
      res => { if (res){ this.consulted.refresh();}}
    );
  }
  onConsultEdit(record){
    this.dialog.open(DoctorConsultAddComponent, {data: <ConsultDialogData>{ id: record.id,consult:record}}).afterClosed().subscribe(
      res => { if (res){ this.consults.refresh();}}
    );
  }

}

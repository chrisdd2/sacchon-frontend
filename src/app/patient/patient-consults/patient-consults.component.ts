import { PatientsService } from 'src/app/services/patients.service';
import { PatientFieldsService } from './../../services/patient-fields.service';
import { MatTableDataSource } from '@angular/material/table';
import { FieldTableDefinitions } from './../patient-fieldtable/patient-fieldtable.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Consultation } from 'src/app/models/consultation.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sacchon-patient-consults',
  templateUrl: './patient-consults.component.html',
  styleUrls: ['./patient-consults.component.scss']
})
export class PatientConsultsComponent implements OnInit,OnDestroy {

  fields:FieldTableDefinitions[]=[
    // { name: "id",value:v=>v.id,label:"Id"},
    { name: "text",value:v=>v.consultationText,label:"Consultation"},
    { name: "date",value:v=>v.date,label:"Date"}
  ];
  records: MatTableDataSource<Consultation>;
  obs:Subscription;

  constructor(private fieldSrv:PatientFieldsService,private patient:PatientsService) { }

  ngOnInit(): void {
    this.records = new MatTableDataSource([]);
    this.obs=this.fieldSrv.consultations.obs.subscribe ( c => this.records.data = c);
    this.fieldSrv.refreshConsultations();
    console.log(this.patient.hasNotification());
    if( this.patient.hasNotification() ){
      this.patient.postNotified();
      this.patient.getPatientInfo();
    }
  }
  ngOnDestroy():void{
    this.obs.unsubscribe();
  }

  onLoadMore(){
    this.fieldSrv.getMoreConsultation();
  }
  hasReached(){
    return this.fieldSrv.consultationsReached;
  }

}

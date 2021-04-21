import { PatientsService } from 'src/app/services/patients.service';
import { PatientFieldsService } from './../../services/patient-fields.service';
import { MatTableDataSource } from '@angular/material/table';
import { FieldTableDefinitions } from '../../shared/fieldtable/fieldtable.component';
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
    { name: "date",value:v=>v.date,label:"Date"},
    { name: "expires",value:v=>v.expirationDate,label:"Valid until"}
  ];
  records: MatTableDataSource<Consultation>;
  obs:Subscription;

  constructor(public fieldSrv:PatientFieldsService,private patient:PatientsService) { }

  ngOnInit(): void {
    this.records = new MatTableDataSource([]);
    this.obs=this.fieldSrv.consultations.observable().subscribe ( c => this.records.data = c);
    this.fieldSrv.consultations.refresh();
    console.log(this.patient.hasNotification());
    if( this.patient.hasNotification() ){
      this.patient.postNotified();
      this.patient.getPatientInfo();
    }
  }
  ngOnDestroy():void{
    this.obs.unsubscribe();
  }
}

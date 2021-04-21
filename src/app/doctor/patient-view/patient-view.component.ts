import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { ApiRoutes } from 'src/app/common/api-info';
import { Consultation } from 'src/app/models/consultation.model';
import { CarbRecord, GlucoseRecord } from 'src/app/models/patient.fields.model';
import { Patient } from 'src/app/models/patient.model';
import { FieldSupplier } from 'src/app/services/field-supplier';
import { PatientItem } from 'src/app/services/reporter.service';
import { FieldTableDefinitions } from 'src/app/shared/fieldtable/fieldtable.component';

export interface DialogData{
  patient:PatientItem;
  consultation:boolean;
}

@Component({
  selector: 'sacchon-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.scss']
})
export class PatientViewComponent implements OnInit {



  carb: FieldSupplier<CarbRecord>;
  glucose: FieldSupplier<GlucoseRecord>;
  consult: FieldSupplier<Consultation>

  carbRecords: MatTableDataSource<CarbRecord>;
  glucoseRecords: MatTableDataSource<GlucoseRecord>;
  consultRecords: MatTableDataSource<Consultation>;

  carbFields: FieldTableDefinitions[] = [
    // { name: "id",value:v=>v.id,label:"Id"},
    { name: "date", value: v => v.date, label: "Date" },
    { name: "carb", value: v => v.carb.toFixed(2), label: "Carb intake ( in grams )" }
  ];
  glucoseFields: FieldTableDefinitions[] = [
    // { name: "id",value:v => v.id,label:"Id"},
    { name: "date", value: v => v.date, label: "Date" },
    { name: "Time", value: v => v.time, label: "Time" },
    { name: "glucose", value: v => v.glucose.toFixed(2), label: "Glucose levels ( ing mg/dL )" }
  ];
  consultFields: FieldTableDefinitions[] = [
    // { name: "id",value:v=>v.id,label:"Id"},
    { name: "text", value: v => v.consultationText, label: "Consultation" },
    { name: "date", value: v => v.date, label: "Date" },
    { name: "expires", value: v => v.expirationDate, label: "Valid until" }
  ];

  carbSub: Subscription;
  glucoseSub: Subscription;
  consultSub: Subscription;


  constructor(public dialogRef:MatDialogRef<PatientViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,
    private http:HttpClient) { }
  
  ngOnDestroy():void{
    this.carbSub.unsubscribe();
    this.glucoseSub.unsubscribe();
    this.consultSub.unsubscribe();
  }

  ngOnInit(): void {
    const params = new HttpParams().append("id",this.data.patient.id.toString());
    this.carb = new FieldSupplier(this.http, ApiRoutes.doctor.patient.carb, params);
    this.carbRecords = new MatTableDataSource([]);
    this.carbSub = this.carb.observable().subscribe(c => this.carbRecords.data = c);
    this.glucoseRecords = new MatTableDataSource([]);
    this.glucose = new FieldSupplier(this.http, ApiRoutes.doctor.patient.glucose, params);
    this.glucoseSub = this.glucose.observable().subscribe(c => this.glucoseRecords.data = c);
    this.consultRecords = new MatTableDataSource([]);
    this.consult = new FieldSupplier(this.http, ApiRoutes.doctor.consultation, params);
    this.consultSub = this.consult.observable().subscribe(c => this.consultRecords.data = c);
    this.carb.refresh();
  }

  onTabChange(event: MatTabChangeEvent) {
    switch (event.tab.textLabel.toLowerCase()) {
      case "carb records":
        this.carb.refresh();
        break;
      case "glucose levels":
        console.log("refresh");
        this.glucose.refresh();
        break;
      case "consultations":
        this.consult.refresh();
      default:
        console.log("this should not happen " + event.tab.textLabel);
    }
  }


}

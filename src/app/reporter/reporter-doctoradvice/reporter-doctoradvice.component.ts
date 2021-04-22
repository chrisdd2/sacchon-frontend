import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiRoutes } from './../../common/api-info';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FieldSupplier } from './../../services/field-supplier';
import { DoctorItem, ReporterService } from './../../services/reporter.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Consultation } from 'src/app/models/consultation.model';
import { FieldTableDefinitions } from 'src/app/shared/fieldtable/fieldtable.component';
import { ApiError } from 'src/app/models/api-error.model';
import { getDateString, resetFieldWithDates } from 'src/app/shared/util';

export interface ConsultationReporter extends Consultation{
  patientEmail:string;
}
export interface PendingPatient {
  patientName:string;
  patientEmail:string;
  dateConsult:Date;
}

function patientName(c:ConsultationReporter):string{
  return `${c.patientName} ( ${c.patientEmail} )`;
}

function consultDate(c:PendingPatient):string{
  // date math hope its corrent
  const diff = Date.now() - c.dateConsult.getTime();
  if( diff < 0 )
    return "Patient is not pending ( logic error in backend )";
  return ((diff/24/3600/1000) | 0).toString();
}

@Component({
  selector: 'sacchon-reporter-doctoradvice',
  templateUrl: './reporter-doctoradvice.component.html',
  styleUrls: ['./reporter-doctoradvice.component.scss']
})
export class ReporterDoctoradviceComponent implements OnInit,OnDestroy {
  form:FormGroup;
  curDoctor:DoctorItem;

  doctorSupplier: FieldSupplier<ConsultationReporter>;
  doctorRecords: MatTableDataSource<ConsultationReporter>
  patientSupplier: FieldSupplier<PendingPatient>;
  patientRecords: MatTableDataSource<PendingPatient>

  doctorFields:FieldTableDefinitions[]=[
    // { name: "id",value:v=>v.id,label:"Id"},
    { name: "patient", value: patientName,label:"Patient" },
    { name: "text",value:v=>v.consultationText,label:"Consultation"},
    { name: "date",value:v=>v.date,label:"Date"},
    { name: "expires",value:v=>v.expirationDate,label:"Valid until"}
  ];
  patientFields:FieldTableDefinitions[]=[
    // { name: "id",value:v=>v.id,label:"Id"},
    { name: "patient", value: patientName,label:"Patient" },
    { name: "date",value:consultDate,label:"Days waiting for consultation"}
  ];
  doctorSub:Subscription;
  patientSub:Subscription;

  constructor(private http:HttpClient,
    private reporterSrv:ReporterService,
    private snackBar:MatSnackBar) {

   }

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(null,Validators.required)
    });
    this.doctorSupplier = new FieldSupplier(this.http,ApiRoutes.reporter.doctor.consults,new HttpParams());
    this.doctorRecords = new MatTableDataSource([]);
    this.doctorSub = this.doctorSupplier.observable().subscribe( c => this.doctorRecords.data = c);
    this.patientSupplier = new FieldSupplier(this.http,ApiRoutes.reporter.pending,new HttpParams());
    this.patientRecords = new MatTableDataSource([]);
    this.patientSub = this.patientSupplier.observable().subscribe( c => this.patientRecords.data = c);
  }
  ngOnDestroy():void{
    this.doctorSub.unsubscribe();
    this.patientSub.unsubscribe();
  }

  onSearch() {
    if (this.form.invalid)
      return;
    this.clearDoctor();
    this.reporterSrv.searchDoctor(this.form.controls.search.value).subscribe(
      (d: DoctorItem) => this.setupDoctor(d),
      (er: ApiError) => this.snackBar.open(er.description, "Close", { duration: 2000, verticalPosition: "top" })
    )
  }
  setupDoctor(d:DoctorItem){
    this.curDoctor = d;
    resetFieldWithDates(this.doctorSupplier,{"id":this.curDoctor.id.toString()},{});
    this.doctorSupplier.refresh();
  }
  clearDoctor(){
    this.curDoctor=null;
  }
  onDateChange(v:{start:Date,end:Date}){
    console.log(v.start,v.end);
    resetFieldWithDates(this.doctorSupplier,{"id":this.curDoctor.id.toString()},v);
    this.doctorSupplier.refresh();
  }
   
  onTabChange(event :MatTabChangeEvent){
    if( event.index == 0 ){
      this.clearDoctor();
    }
    else if(event.index == 1){
      this.patientSupplier.refresh();
    }
    else
      console.log("this should not happen");
  }

}

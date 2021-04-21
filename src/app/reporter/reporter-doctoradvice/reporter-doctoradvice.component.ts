import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiRoutes } from './../../common/api-info';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FieldSupplier } from './../../services/field-supplier';
import { DoctorItem, ReporterService } from './../../services/reporter.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Consultation } from 'src/app/models/consultation.model';
import { FieldTableDefinitions } from 'src/app/shared/fieldtable/fieldtable.component';
import { ApiError } from 'src/app/models/api-error.model';
import { getDateString, resetFieldWithDates } from 'src/app/shared/util';

export interface ConsultationReporter extends Consultation{
  patientName:string;
}

@Component({
  selector: 'sacchon-reporter-doctoradvice',
  templateUrl: './reporter-doctoradvice.component.html',
  styleUrls: ['./reporter-doctoradvice.component.scss']
})
export class ReporterDoctoradviceComponent implements OnInit {
  form:FormGroup;
  curDoctor:DoctorItem;

  supplier: FieldSupplier<ConsultationReporter>;
  records: MatTableDataSource<ConsultationReporter>

  fields:FieldTableDefinitions[]=[
    // { name: "id",value:v=>v.id,label:"Id"},
    { name: "patient", value: v=>v.patientName,label:"Patient" },
    { name: "text",value:v=>v.consultationText,label:"Consultation"},
    { name: "date",value:v=>v.date,label:"Date"},
    { name: "expires",value:v=>v.expirationDate,label:"Valid until"}
  ];
  sub:Subscription;

  constructor(private http:HttpClient,
    private reporterSrv:ReporterService,
    private snackBar:MatSnackBar) {

   }

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(null,Validators.required)
    });
    this.supplier = new FieldSupplier(this.http,ApiRoutes.reporter.doctor.consults,new HttpParams());
    this.records = new MatTableDataSource([]);
    this.supplier.observable().subscribe( c => this.records.data = c);
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
    resetFieldWithDates(this.supplier,{"id":this.curDoctor.id.toString()},{});
    this.supplier.refresh();
  }
  clearDoctor(){
    this.curDoctor=null;
  }
  onDateChange(v:{start:Date,end:Date}){
    console.log(v.start,v.end);
    resetFieldWithDates(this.supplier,{"id":this.curDoctor.id.toString()},v);
    this.supplier.refresh();
  }

}

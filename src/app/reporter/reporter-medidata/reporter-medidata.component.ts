import { ApiRoutes } from './../../common/api-info';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlucoseRecord } from './../../models/patient.fields.model';
import { FieldSupplier, getDateString } from './../../shared/util';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReporterService, ReporterPatient } from './../../services/reporter.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiError } from 'src/app/models/api-error.model';
import { CarbRecord } from 'src/app/models/patient.fields.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';
import { FieldTableDefinitions } from 'src/app/shared/fieldtable/fieldtable.component';

@Component({
  selector: 'sacchon-reporter-medidata',
  templateUrl: './reporter-medidata.component.html',
  styleUrls: ['./reporter-medidata.component.scss']
})
export class ReporterMedidataComponent implements OnInit, OnDestroy {

  form: FormGroup;
  curPatient: ReporterPatient;j

  carb: FieldSupplier<CarbRecord>;
  glucose: FieldSupplier<GlucoseRecord>;

  carbRecords: MatTableDataSource<CarbRecord>;
  glucoseRecords: MatTableDataSource<GlucoseRecord>;

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

  carbSub:Subscription;
  glucoseSub:Subscription;

  constructor(private repoterSrv: ReporterService,
    private snackBar: MatSnackBar,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.carb = new FieldSupplier(this.http,ApiRoutes.reporter.patient.carb, new HttpParams());
    this.glucose= new FieldSupplier(this.http,ApiRoutes.reporter.patient.glucose,new HttpParams());
    this.carbRecords = new MatTableDataSource([]);
    this.glucoseRecords = new MatTableDataSource([]);
    this.carbSub=this.carb.observable().subscribe( c => this.carbRecords.data=c);
    this.glucoseSub=this.glucose.observable().subscribe( c => this.glucoseRecords.data=c);
    this.form = new FormGroup({
      search: new FormControl(null, [Validators.required])
    });
  }
  ngOnDestroy() {
    this.carbSub.unsubscribe();
    this.glucoseSub.unsubscribe();
  }

  onSearch() {
    if (this.form.invalid)
      return;
    this.clearPatient();
    this.repoterSrv.searchPatient(this.form.controls.search.value).subscribe(
      (p: ReporterPatient) => this.setupPatient(p),
      (er: ApiError) => this.snackBar.open(er.description, "Close", { duration: 2000, verticalPosition: "top" })
    )
  }

  setupPatient(p:ReporterPatient) {
    this.curPatient=p;
    this.resetField(this.carb,{});
    this.resetField(this.glucose,{});
    this.carb.refresh();
    this.glucose.refresh();
  }
  clearPatient() {
    this.curPatient = null;
  }
  onTabChange(event: MatTabChangeEvent) {
    switch (event.tab.textLabel.toLowerCase()) {
      case "carb intake":
        this.carb.refresh();
        break;
      case "blood glucose levels":
        this.glucose.refresh();
        break;
      default:
        console.log("this should not happen " + event.tab.textLabel);
    }
  }

  resetField<T>(field:FieldSupplier<T>,{start=null,end=null}){
    let params = new HttpParams();
    params = params.set("id",this.curPatient.id.toString());
    if( start)
      params = params.set("start",getDateString(start))
    if( end)
      params = params.set("end",getDateString(end));
    field.reset(params);
  }
  onDateChange(v:{start:Date,end:Date}){
    console.log(v.start,v.end);

    this.resetField(this.carb,v);
    this.resetField(this.glucose,v);
    this.glucose.refresh();
    this.carb.refresh();
  }
}

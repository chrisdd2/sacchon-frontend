import { MatSnackBar } from '@angular/material/snack-bar';
import { FieldTableDefinitions } from '../../shared/fieldtable/fieldtable.component';
import { CarbRecord, GlucoseRecord } from './../../models/patient.fields.model';
import { PatientFieldsService } from './../../services/patient-fields.service';
import { Router } from '@angular/router';
import { PatientAddCarbComponent, DialogCarbData } from './../patient-add-carb/patient-add-carb.component';
import { MatDialog } from '@angular/material/dialog';
import { RecordCounts } from './../../common/api-info';
import { PatientsService } from './../../services/patients.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { debounceTime, delay } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogGlucoseData, PatientAddGlucoseComponent } from '../patient-add-glucose/patient-add-glucose.component';
import { Subscription } from 'rxjs';



@Component({
  selector: 'sacchon-patient-medical',
  templateUrl: './patient-medical.component.html',
  styleUrls: ['./patient-medical.component.scss']
})
export class PatientMedicalComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) carbPaginator;


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

  carbRecord: MatTableDataSource<CarbRecord>;
  glucoseRecord: MatTableDataSource<GlucoseRecord>

  carbAvgLoading: boolean = true;
  carbAverage: number;
  carbCount: number;

  glucoseAvgLoading: boolean = true;
  glucoseAverage: number;
  glucoseCount: number;
  countLoading: boolean = true;

  carbSub: Subscription;
  glucoseSub: Subscription;
  constructor(private patientSrv: PatientsService,
    private dialog: MatDialog,
    private router: Router,
    public fieldsSrv: PatientFieldsService,
    private snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.refreshOverview();
    this.carbRecord = new MatTableDataSource();
    this.glucoseRecord = new MatTableDataSource();
    this.glucoseSub = this.fieldsSrv.glucose.observable().subscribe(d => this.glucoseRecord.data = d);
    this.carbSub = this.fieldsSrv.carb.observable().subscribe(d => this.carbRecord.data = d);
  }
  ngOnDestroy(): void {
    this.glucoseSub.unsubscribe();
    this.carbSub.unsubscribe();
  }

  refreshOverview() {
    this.getCount();
    this.glucoseChange({ start: null, end: null });
    this.carbChange({ start: null, end: null });
  }
  getCount() {
    this.countLoading = true;
    this.patientSrv.getCarbGlucoseCount().subscribe(
      (s: RecordCounts) => {
        this.carbCount = s.carbs;
        this.glucoseCount = s.glucose;
        this.countLoading = false;
      }
    );
  }
  glucoseChange(val: any) {
    this.glucoseAvgLoading = true;
    this.patientSrv.getPatientAvg("glucose", val.start, val.end)
      .pipe(debounceTime(1000), delay(500)).subscribe(
        s => {
          this.glucoseAverage = s.value
          this.glucoseAvgLoading = false;
        });
  }
  carbChange(val: any) {
    this.patientSrv.getPatientAvg("carb", val.start, val.end)
      .pipe(debounceTime(1000), delay(500)).subscribe(
        s => {
          this.carbAverage = s.value
          this.carbAvgLoading = false;
        }
      );
  }

  onTabChange(event: MatTabChangeEvent) {
    switch (event.tab.textLabel.toLowerCase()) {
      case "overview":
        this.refreshOverview();
        break;
      case "carb intake":
        this.fieldsSrv.carb.refresh();
        break;
      case "blood glucose levels":
        this.fieldsSrv.glucose.refresh();
        break;
      default:
        console.log("this should not happen " + event.tab.textLabel);
    }
  }
  onCarbAdd() {
    const dialogRef = this.dialog.open(PatientAddCarbComponent, {
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res)
          this.fieldsSrv.carb.refresh();
      }
    );
  }
  onCarbUpdate(record) {
    const dialogRef = this.dialog.open(PatientAddCarbComponent, {
      data: <DialogCarbData>{ id: record.id, carb: record.carb, date: record.date }
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res)
          this.fieldsSrv.carb.refresh();
      }
    );
  }
  onCarbDelete(record) {
    this.patientSrv.deleteCarb(record.id).subscribe(
      () => {
        this.snackBar.open("Succesfully deleted", null, { duration: 2000 })
        this.fieldsSrv.carb.refresh();
      },
      (err) => this.snackBar.open(`Error deleting: ${err.description}`, null, { duration: 2000 })
    );
  }

  onGlucoseAdd() {
    const dialogRef = this.dialog.open(PatientAddGlucoseComponent, {
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res)
          this.fieldsSrv.glucose.refresh()
      }
    );
  }
  onGlucoseUpdate(record) {
    const dialogRef = this.dialog.open(PatientAddGlucoseComponent, {
      data: <DialogGlucoseData>{ id: record.id, glucose: record.glucose, date: record.date, time: record.time }
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if (res)
          this.fieldsSrv.glucose.refresh();
      }
    );
  }
  onGlucoseDelete(record) {
    this.patientSrv.deleteGlucose(record.id).subscribe(
      () => {
        this.snackBar.open("Succesfully deleted", null, { duration: 2000 })
        this.fieldsSrv.glucose.refresh();
      },
      (err) => this.snackBar.open(`Error deleting: ${err.description}`, null, { duration: 2000 })
    );
  }
}

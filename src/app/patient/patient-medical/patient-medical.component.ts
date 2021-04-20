import { CarbRecord, GlucoseRecord } from './../../models/patient.fields.model';
import { PatientFieldsService } from './../../services/patient-fields.service';
import { Router } from '@angular/router';
import { PatientAddCarbComponent } from './../patient-add-carb/patient-add-carb.component';
import { MatDialog } from '@angular/material/dialog';
import { RecordCounts } from './../../common/api-info';
import { PatientsService } from './../../services/patients.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, delay } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';


@Component({
  selector: 'sacchon-patient-medical',
  templateUrl: './patient-medical.component.html',
  styleUrls: ['./patient-medical.component.scss']
})
export class PatientMedicalComponent implements OnInit {

  displayedColumns: string[] = ['id', 'carb', 'date', 'actions'];

  carbAvgLoading: boolean = true;
  carbAverage: number;
  carbCount: number;
  carbRecords: CarbRecord[]

  glucoseAvgLoading: boolean = true;
  glucoseAverage: number;
  glucoseCount: number;
  glucoseRecords: GlucoseRecord[];

  countLoading: boolean = true;

  constructor(private patientSrv: PatientsService,
              private dialog:MatDialog,
              private router:Router,
              private fieldsSrv: PatientFieldsService) { 
              }
  ngOnInit(): void {
    this.carbRecords=[];
    this.glucoseRecords=[];
    this.refreshOverview();
    this.fieldsSrv.glucose.obs.subscribe( d => this.glucoseRecords = d)
    this.fieldsSrv.carb.obs.subscribe( d => this.carbRecords = d);
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
      .pipe(debounceTime(1000),delay(500)).subscribe(
        s => {
          this.glucoseAverage = s.value
          this.glucoseAvgLoading = false;
        });
  }
  carbChange(val: any) {
    this.patientSrv.getPatientAvg("carb", val.start, val.end)
      .pipe(debounceTime(1000),delay(500)).subscribe(
      s => {
        this.carbAverage = s.value
        this.carbAvgLoading = false;
      }
    );
  }

  onTabChange( event:MatTabChangeEvent){
    switch( event.tab.textLabel.toLowerCase() ){
      case "overview" : 
        this.refreshOverview();
        break;
      case "carb intake":
        this.refreshCarbs();
        break;
      case "blood glucose levels":
        this.refreshGlucose();
        break;
      default:
        console.log("this should not happen " + event.tab.textLabel);
    }
  }
  onAddDialog(){
    const dialogRef = this.dialog.open(PatientAddCarbComponent, {
    });
    dialogRef.afterClosed().subscribe(
      res => {
        if( res)
          this.refreshCarbs();
        console.log(res);
      }
    );
  }
  refreshCarbs(){
    console.log("refreshing carbs!");
    this.fieldsSrv.refreshCarbs();
  }
  refreshGlucose(){
    console.log("refreshing glucose!");
    this.fieldsSrv.refreshGlucose();
  }
}

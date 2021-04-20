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



  carbAvgLoading: boolean = true;
  carbAverage: number;
  carbCount: number;

  glucoseAvgLoading: boolean = true;
  glucoseAverage: number;
  glucoseCount: number;

  countLoading: boolean = true;

  constructor(private patientSrv: PatientsService,
              private dialog:MatDialog,
              private router:Router) { }

  ngOnInit(): void {
    this.refreshOverview();
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
    if( event.tab.textLabel == "Overview" )
      this.refreshOverview();
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
  }
}

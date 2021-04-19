import { RecordCounts } from './../../common/api-info';
import { PatientsService } from './../../services/patients.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sacchon-patient-medical',
  templateUrl: './patient-medical.component.html',
  styleUrls: ['./patient-medical.component.scss']
})
export class PatientMedicalComponent implements OnInit {

  carbCount:number;
  glucoseCount:number;

  carbAverage: number;
  glucoseAverage: number;

  constructor(private patientSrv: PatientsService) { }

  ngOnInit(): void {
    this.carbAverage = 0;
    this.glucoseAverage = 0;
    this.refreshInfo();
  }
  refreshInfo(){
    this.patientSrv.getCarbGlucoseCount().subscribe(
      (s:RecordCounts)=>{
        this.carbCount = s.carbs;
        this.glucoseCount=s.glucose;
      }
    );
    this.glucoseChange({ start: null, end: null });
    this.carbChange({ start: null, end: null});
  }
  glucoseChange(val: any) {
    this.patientSrv.getPatientAvg("glucose", val.start, val.end).subscribe(
      s => { this.glucoseAverage = s.value })
    console.log("glucose requested")
  }
  carbChange(val: any) {
    this.patientSrv.getPatientAvg("carb", val.start, val.end).subscribe(
      s => { this.carbAverage = s.value }
    )
    console.log("carb requested")
  }

}

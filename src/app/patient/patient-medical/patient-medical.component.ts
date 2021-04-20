import { PatientFieldsService } from './../../services/patient-fields.service';
import { Router } from '@angular/router';
import { PatientAddCarbComponent } from './../patient-add-carb/patient-add-carb.component';
import { MatDialog } from '@angular/material/dialog';
import { RecordCounts } from './../../common/api-info';
import { PatientsService } from './../../services/patients.service';
import { Component, OnInit } from '@angular/core';
import { debounceTime, delay } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'sacchon-patient-medical',
  templateUrl: './patient-medical.component.html',
  styleUrls: ['./patient-medical.component.scss']
})
export class PatientMedicalComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  carbAvgLoading: boolean = true;
  carbAverage: number;
  carbCount: number;

  glucoseAvgLoading: boolean = true;
  glucoseAverage: number;
  glucoseCount: number;

  countLoading: boolean = true;

  constructor(private patientSrv: PatientsService,
              private dialog:MatDialog,
              private router:Router,
              private fieldsSrv: PatientFieldsService) { }

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

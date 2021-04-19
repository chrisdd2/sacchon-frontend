import { PatientsService } from './../../services/patients.service';
import { DateRange } from '../../shared/date-range/date-range.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'sacchon-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.scss']
})
export class PatientHomeComponent implements OnInit {
  patient:Patient;
  glucose_loading:boolean;
  carb_loading:boolean;

  constructor(public auth:AuthService,
              private patientSrv:PatientsService) { }

  ngOnInit(): void {
    this.patientSrv.getPatientInfo().subscribe(
      p => this.patient=p,
      er => console.log(er)
    )
    this.glucose_loading=false;
    this.carb_loading=false;
  }


  getAvg(type:string,{start,end}:DateRange,elem:any){
    elem.loading=true;
    this.patientSrv.getPatientAvg(type,start,end)
    .subscribe(
      avg => {
        elem.value=avg.value;
        elem.loading=false;
      },
      er => console.log(er)
    );
  }

}

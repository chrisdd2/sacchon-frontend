import { DateRange } from './../../common/date-range/date-range.component';
import { DataService } from './../../services/data.service';
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
              private data:DataService) { }

  ngOnInit(): void {
    this.data.getPatientInfo().subscribe(
      p => this.patient=p,
      er => console.log(er)
    )
    this.glucose_loading=false;
    this.carb_loading=false;
  }


  getAvg(type:string,{start,end}:DateRange,elem:any){
    elem.loading=true;
    const dstart = start? start.getTime(): 0;
    const dend = end? end.getTime(): 0;
    this.data.getPatientAvg(type,dstart,dend)
    .subscribe(
      avg => {
        elem.value=avg.avg;
        elem.loading=false;
      },
      er => console.log(er)
    );
  }

}

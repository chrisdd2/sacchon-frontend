import { PatientsService } from './../../services/patients.service';
import { Component, OnInit,OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'sacchon-patient-root',
  templateUrl: './patient-root.component.html',
  styleUrls: ['./patient-root.component.scss']
})
export class PatientRootComponent implements OnInit , AfterViewInit{
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  showToolBar:boolean;
  patient:Patient;
  

  constructor(private breakpoint:BreakpointObserver,
              private patientSrv:PatientsService) { 
  }

  
  ngAfterViewInit():void{
    this.breakpoint.observe('(max-width: 960px)').subscribe( (res) => {
      if( res.matches ){
        this.sidenav.mode = 'over';
        this.sidenav.close();
        this.showToolBar=true;
      } else{
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.showToolBar=false;
      }
    })
    this.patientSrv.getPatientInfo().subscribe(
      p =>{ this.patient=p},
      er => console.log(er)
    )
  }

  closeNav(){
    if( this.sidenav.mode == "over"){
      this.sidenav.close();
    }
  }

  hasNotification(){
    return this.patient?.consultationStatus == "UPDATED" || this.patient?.consultationStatus == "NEW"
  }

  ngOnInit(): void {
  }

}

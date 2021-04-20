import { Observable } from 'rxjs';
import { PatientsService } from './../../services/patients.service';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'sacchon-patient-root',
  templateUrl: './patient-root.component.html',
  styleUrls: ['./patient-root.component.scss']
})
export class PatientRootComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  showToolBar: boolean;
  patient:Patient;


  constructor(private breakpoint: BreakpointObserver,
    public patientSrv: PatientsService) {
  }


  ngAfterViewInit(): void {
    this.breakpoint.observe('(max-width: 960px)').subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
        this.showToolBar = true;
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.showToolBar = false;
      }
    })
  }

  closeNav() {
    if (this.sidenav.mode == "over") {
      this.sidenav.close();
    }
  }

  ngOnInit(): void {
    this.patientSrv.patient.subscribe( p => this.patient=p);
    this.patientSrv.getPatientInfo();
  }

}

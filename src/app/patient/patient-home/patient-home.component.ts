import { PatientsService } from './../../services/patients.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Patient } from 'src/app/models/patient.model';
import { DateRange } from '@angular/material/datepicker';

@Component({
  selector: 'sacchon-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.scss']
})
export class PatientHomeComponent implements OnInit {
  patient:Patient;

  constructor(public auth:AuthService,
              private patientSrv:PatientsService) { }

  ngOnInit(): void {
    this.patientSrv.getPatientInfo().subscribe(
      p => this.patient=p,
      er => console.log(er)
    )
  }

}

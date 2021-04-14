import { DataService, AvgItem } from './../../services/data.service';
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

  constructor(public auth:AuthService,
              private data:DataService) { }

  ngOnInit(): void {
    this.data.getPatientInfo().subscribe(
      p => this.patient=p,
      er => console.log(er)
    )
  }
}

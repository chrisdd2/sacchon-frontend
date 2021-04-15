import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'sacchon-patient-root',
  templateUrl: './patient-root.component.html',
  styleUrls: ['./patient-root.component.scss']
})
export class PatientRootComponent implements OnInit {
  patient:Patient;

  constructor(private data:DataService) { }

  ngOnInit(): void {
  }

}

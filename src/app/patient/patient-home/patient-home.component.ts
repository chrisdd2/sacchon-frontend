import { MatDialog } from '@angular/material/dialog';
import { PatientsService } from './../../services/patients.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Patient } from 'src/app/models/patient.model';
import { DateRange } from '@angular/material/datepicker';
import { PatientAddGlucoseComponent } from '../patient-add-glucose/patient-add-glucose.component';
import { PatientAddCarbComponent } from '../patient-add-carb/patient-add-carb.component';

@Component({
  selector: 'sacchon-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.scss']
})
export class PatientHomeComponent implements OnInit {
  patient: Patient;

  constructor(public auth: AuthService,
    public patientSrv: PatientsService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.patientSrv.patient.subscribe(p => this.patient = p);
    this.patientSrv.getPatientInfo();
  }
  addGlucose() {
    this.dialog.open(PatientAddGlucoseComponent, {
    });
  }
  addCarb() {
    this.dialog.open(PatientAddCarbComponent, {
    });
  }
}

import { Validators } from '@angular/forms';
import { PatientsService } from './../services/patients.service';

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Patients } from '../models/patients.model';



@Component({
  selector: 'sacchon-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {


  patients: Patients[];
  currentPatient:Patients;
  constructor(public auth:AuthService, private patientsService:PatientsService){
    this.patients = patientsService.getData();
    this.currentPatient=new Patients(null,null,null);
    console.log(this.patients);
  }

  addConsultation(){
    console.log('Adding a new consultation of patient ${name.value} with new consultation: ${consultation.value}');
    this.patients.push(new Patients(this.currentPatient.id,this.currentPatient.name,this.currentPatient.consultation));
    return false;
  }

  onClickPatient(patient)
  {
    this.currentPatient=patient;
  }

  ngOnInit(): void {
  }
}

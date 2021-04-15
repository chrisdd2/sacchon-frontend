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
  constructor(public auth:AuthService, private patientsService:PatientsService) { 
    this.patients = patientsService.getData();
    console.log(this.patients);
  }

  addConsultation(id:string, name:string, consultation:string){
    this.patients.push(new Patients(id, name,consultation));
    return false;
  }

  ngOnInit(): void {
  
  }

}

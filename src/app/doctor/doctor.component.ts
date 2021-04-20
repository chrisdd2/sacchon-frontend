import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from './../services/patients.service';

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Patients } from '../models/patients.model';
import { DoctorService } from '../services/doctor.service';
import { Router } from '@angular/router';



@Component({
  selector: 'sacchon-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  patientForm: FormGroup;
  patients: Patients[];
  doctorPatients: Patients[];
  currentPatient:Patients;
  data =  {
       "id":"7",
       "text":"Consultation from doctor",
       "date":"2021-04-19"
    }
  constructor(private router: Router, public auth:AuthService, private patientsService:PatientsService, 
    private doctorService: DoctorService, private fb: FormBuilder){
    this.patients = patientsService.getData(); /// take specific patient data!!!!! not fixed
    this.currentPatient=new Patients(null,null,null);
    console.log(this.patients);
    console.log(this.currentPatient);
  }

  addConsultation(){
    // console.log('Adding a new consultation of patient ${name.value} with new consultation: ${consultation.value}');
    // console.log('Adding a new consultation of patient');
    // console.log(this.patients + "--------------------------------------------------")
    this.getPatientsWithoutConsultation();
    this.addConsultationToPatient();
    // this.patients.push(new Patients(this.currentPatient.id,this.currentPatient.name,this.currentPatient.consultation));
    // this.patients.push(new Patients(this.currentPatient.id,this.currentPatient.name,this.currentPatient.consultation));
    return false;
  }

  onClickPatient(patient)
  {
    this.currentPatient=patient;
    // console.log("--------------------------------------------------")
    // console.log("--------------------------------------------------")
    // console.log(this.currentPatient)
    // console.log(patient.id + "--------------------------------------------------")
  }

  ngOnInit(): void {

    this.patientForm = this.fb.group({
     
      firstName: new FormControl(""),
      lastName: new FormControl(""), 
      email: new FormControl("") });


    this.getPatientsWithoutConsultation();
    this.getDoctorPatientsWithConsultation();
    //this.addConsultationToPatient();
  }

  addConsultationToPatient() {
    this.doctorService.addConsulationToPatient(this.data)
    .subscribe(res => 
      {console.log(res)})
  }
  getPatientsWithoutConsultation() {
        
    this.doctorService.getPatients()
         .subscribe(res => {
           this.patients = res;
           console.log(this.patients)
           //location.reload();
         });
  }

  getDoctorPatientsWithConsultation() {
    this.doctorService.getDoctorPatientsWithCOnsultation()
    .subscribe(res => {
    
      this.doctorPatients = res;
      console.log(res)
    })
  }

  save(){}
}

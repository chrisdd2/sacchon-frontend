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

  patientId;
  patientFirstName;
  patientLastName;
  patientForm: FormGroup;
  patients: any[];
  doctorPatients: any[];
  currentPatient: any;
  data: any;

  constructor(private router: Router, public auth: AuthService, private patientsService: PatientsService,
              private doctorService: DoctorService, private fb: FormBuilder){
    // this.patients = patientsService.getData(); /// take specific patient data!!!!! not fixed
    this.currentPatient = new Patients(null, null, null);
   // console.log(this.patients);
    //console.log(this.currentPatient);
  }

  addConsultation(id){
    // console.log('Adding a new consultation of patient ${name.value} with new consultation: ${consultation.value}');
    // console.log('Adding a new consultation of patient');
    // console.log(this.patients + "--------------------------------------------------")
    // this.getPatientsWithoutConsultation();
    // this.addConsultationToPatient();
    // this.patients.push(new Patients(this.currentPatient.id,this.currentPatient.name,this.currentPatient.consultation));
    // this.patients.push(new Patients(this.currentPatient.id,this.currentPatient.name,this.currentPatient.consultation));
    return false;
  }

  onClickPatient(patient)
  {
    this.currentPatient = patient;
    console.log(patient);
    // console.log("--------------------------------------------------")
    // console.log("--------------------------------------------------")
    // console.log(this.currentPatient)
    // console.log(patient.id + "--------------------------------------------------")
  }

  ngOnInit(): void {

    this.patientForm = this.fb.group({
      consultation: new FormControl('')
    });

    // this.patients = [
    //   {
    //     id: 2,
    //     firstName: 'patient',
    //     lastName: 'lastpatient',
    //     email: 'patient@gmail.com'
    //   },
    //   {
    //     id: 12,
    //     firstName: 'Alex',
    //     lastName: 'Jones',
    //     email: 'lynette.kertzmann@Tisa'
    //   },
    //   {
    //     id: 13,
    //     firstName: 'Lin',
    //     lastName: 'Nikolaus',
    //     email: 'joshua.streich@Wilmer'
    //   },
    //   {
    //     id: 17,
    //     firstName: 'Chantel',
    //     lastName: 'Jakubowski',
    //     email: 'benedict.cronin@Fritz'
    //   },
    //   {
    //     id: 26,
    //     firstName: 'Michiko',
    //     lastName: 'Borer',
    //     email: 'shemika.pfannerstill@Porter'
    //   },
    //   {
    //     id: 28,
    //     firstName: 'Johnnie',
    //     lastName: 'Effertz',
    //     email: 'kamilah.harvey@Robt'
    //   }
    // ];

    this.getPatientsWithoutConsultation();
   // this.getDoctorPatientsWithConsultation();
  }

  addConsultationToPatient() {
    console.log(this.patientForm.get('consultation'));
    this.data = {
      id: this.patientId,
      text: this.patientForm.get('consultation').value,
      date: '2021-04-19'
    };
    this.doctorService.addConsulationToPatient(this.data)
    .subscribe(res =>
      {console.log(res); } );
    this.patientForm.get('consultation').setValue('');
  }
  getPatientsWithoutConsultation() {

    this.doctorService.getPatients()
         .subscribe(res => {
           this.patients = res;
           console.log(this.patients);
           // location.reload();
         });
  }

  getDoctorPatientsWithConsultation() {
    this.doctorService.getDoctorPatientsWithCOnsultation()
    .subscribe(res => {
      this.doctorPatients = res;
      console.log(res);
    });
  }

  setPatient(id, fname, lname) {
    this.patientId = id;
    this.patientFirstName = fname;
    this.patientLastName = lname;
  }
}

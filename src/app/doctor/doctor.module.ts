import { SharedModule } from '../shared/shared.module';
import { DoctorComponent } from './doctor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// ---------------------------------------
// ---------------------------------------
//free patients GET--> http://localhost:9000/api/doctor/consultation/pending
// ---------------------------------------
// new consultatuion POST --> http://localhost:9000/api/doctor/consultation
// basic auth 
// user: doctor@gmail.com
// pass: mpes
// JSON example
// {
//   "id":"4",
//   "text":"Consultation from doctor",
//   "date":"2021-04-19"
// }
// ---------------------------------------
// patients assigned to the logged in doctor GET --> http://localhost:9000/api/doctor/patients
// ---------------------------------------
// ---------------------------------------

export const routes: Routes = [
  {
    path: '', 
    component:DoctorComponent ,
    children:[
      {path:'', redirectTo:'home', pathMatch:'prefix'},
      {path: 'home', component:DoctorComponent},
      {path: 'medical', component:DoctorComponent},
      {path: 'consults', component:DoctorComponent}
    ]
  }
];

@NgModule({
  declarations: [DoctorComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DoctorModule { }

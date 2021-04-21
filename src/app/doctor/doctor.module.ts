import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DoctorRootComponent } from './doctor-root/doctor-root.component';
import { DoctorHomeComponent } from './doctor-home/doctor-home.component';
import { DoctorMedicalComponent } from './doctor-medical/doctor-medical.component';
import { DoctorConsultComponent } from './doctor-consult/doctor-consult.component';


export const routes: Routes = [
  {
    path: '', 
    component:DoctorRootComponent ,
    children:[
      {path:'', redirectTo:'home', pathMatch:'prefix'},
      {path: 'home', component:DoctorHomeComponent},
      {path: 'medical', component:DoctorMedicalComponent},
      {path: 'consults', component:DoctorConsultComponent}
    ]
  }
];

@NgModule({
  declarations: [
    DoctorRootComponent,
    DoctorHomeComponent,
    DoctorMedicalComponent,
    DoctorConsultComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DoctorModule { }

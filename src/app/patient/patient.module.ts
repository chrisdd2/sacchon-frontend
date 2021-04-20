import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRootComponent } from './patient-root/patient-root.component';
import { PatientHomeComponent } from './patient-home/patient-home.component';
import { PatientMedicalComponent } from './patient-medical/patient-medical.component';
import { PatientAddCarbComponent } from './patient-add-carb/patient-add-carb.component';



export const routes: Routes = [
  {
    path: '', 
    component: PatientRootComponent,
    children:[
      {path:'', redirectTo:'home', pathMatch:'prefix'},
      {path: 'home', component:PatientHomeComponent},
      {path: 'medical', component:PatientMedicalComponent},
      {path: 'consults', component:PatientHomeComponent}
    ]
  }
];

@NgModule({
  declarations: [
    PatientRootComponent,
    PatientHomeComponent,
    PatientMedicalComponent,
    PatientAddCarbComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientModule { }

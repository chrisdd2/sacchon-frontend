import { SharedModule } from './../common/shared.module';
import { PatientAvgItemComponent } from './patient-avg-item/patient-avg-item.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRootComponent } from './patient-root/patient-root.component';
import { PatientHomeComponent } from './patient-home/patient-home.component';


export const routes: Routes = [
  {
    path: '', 
    component: PatientRootComponent,
    children:[
      {path:'', redirectTo:'home', pathMatch:'prefix'},
      {path: 'home', component:PatientHomeComponent},
      {path: 'medical', component:PatientHomeComponent},
      {path: 'consults', component:PatientHomeComponent}
    ]
  }
];

@NgModule({
  declarations: [
    PatientRootComponent,
    PatientHomeComponent,
    PatientAvgItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientModule { }

import { DoctorComponent } from './doctor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


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
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DoctorModule { }

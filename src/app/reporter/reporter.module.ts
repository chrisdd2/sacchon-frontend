import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporterRootComponent } from './reporter-root/reporter-root.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ReporterHomeComponent } from './reporter-home/reporter-home.component';
import { ReporterMedidataComponent } from './reporter-medidata/reporter-medidata.component';
import { ReporterDoctoradviceComponent } from './reporter-doctoradvice/reporter-doctoradvice.component';



export const routes: Routes = [
  {
    path: '', 
    component: ReporterRootComponent,
    children:[
      {path:'', redirectTo:'home', pathMatch:'prefix'},
      {path: 'home', component:ReporterRootComponent}
      {path: 'MediDataRepo', component:ReporterRootComponent},
      {path: 'DoctorAdvice', component:ReporterRootComponent},
    ]
  }
];


@NgModule({
  declarations: [
    ReporterRootComponent,
    ReporterHomeComponent,
    ReporterMedidataComponent,
    ReporterDoctoradviceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ReporterModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporterRootComponent } from './reporter-root/reporter-root.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ReporterHomeComponent } from './reporter-home/reporter-home.component';
import { ReporterMedidataComponent } from './reporter-medidata/reporter-medidata.component';
import { ReporterDoctoradviceComponent } from './reporter-doctoradvice/reporter-doctoradvice.component';
import { ReporterActivityComponent } from './reporter-activity/reporter-activity.component';



export const routes: Routes = [
  {
    path: '', 
    component: ReporterRootComponent,
    children:[
      {path:'', redirectTo:'home', pathMatch:'prefix'},
      {path: 'home', component:ReporterHomeComponent},
      {path: 'medidata', component:ReporterMedidataComponent},
      {path: 'doctoradvice', component:ReporterDoctoradviceComponent},
      {path: 'activity', component:ReporterActivityComponent},
    ]
  }
];


@NgModule({
  declarations: [
    ReporterRootComponent,
    ReporterHomeComponent,
    ReporterMedidataComponent,
    ReporterDoctoradviceComponent,
    ReporterActivityComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ReporterModule { }

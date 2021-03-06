import { NotLoggedGuard } from './common/notlogged.guard';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './common/role.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [NotLoggedGuard]
  },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule),
    canActivate: [RoleGuard],
    data: { role: 'patient' }
  },
  {
    path: 'doctor',
    loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule),
    canActivate: [RoleGuard],
    data: { role: 'doctor' }
  },
  {
    path: 'reporter',
    loadChildren: () => import('./reporter/reporter.module').then(m => m.ReporterModule),
    canActivate: [RoleGuard],
    data: { role: 'reporter' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

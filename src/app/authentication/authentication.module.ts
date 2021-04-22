import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
export const routes:Routes=[
  { path: '',redirectTo: 'login', pathMatch: 'prefix'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'settings',component: SettingsComponent}
]

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
})
export class AuthenticationModule { }

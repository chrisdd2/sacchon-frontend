
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { FakeBackendInterceptor } from './common/fake-backend.interceptor';
import { AuthInterceptor } from './common/auth.interceptor';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { HeaderComponent } from './common/header/header.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HomeComponent } from './common/home/home.component';
import { PatientsService } from './services/patients.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [
    FormBuilder,
    AuthService,
    PatientsService,
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:FakeBackendInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

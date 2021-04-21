import { PatientsService } from './services/patients.service';
import { ReporterService } from './services/reporter.service';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PatientFieldsService } from './services/patient-fields.service';
import { MatSnackBar,  } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { AuthInterceptor } from './common/auth.interceptor';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { ErrorInterceptor } from './common/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { MatColumnDef } from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    AuthService,
    MatDialog,
    MatSnackBar,
    PatientFieldsService,
    ReporterService,
    PatientsService,
    MatColumnDef,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

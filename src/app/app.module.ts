import { SharedModule } from './shared/shared.module';

import { FakeBackendInterceptor } from './common/fake-backend.interceptor';
import { AuthInterceptor } from './common/auth.interceptor';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { PatientsService } from './services/patients.service';
import { ErrorInterceptor } from './common/error.interceptor';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule
    
  ],
  providers: [
    AuthService,
    PatientsService,
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
    // {provide: HTTP_INTERCEPTORS, useClass:FakeBackendInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

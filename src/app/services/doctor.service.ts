import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getPatients(): Observable<any> {
    const headers =  {'Content-type': 'application-json'}
    return this.http.get(environment.apiUrl + '/doctor/consultation/pending' )
  }

  addConsulationToPatient(data: any): Observable<any> {
    const headers =  {'Authorization': 'Basic ' + btoa('doctor@gmail.com:mpes')};
    //const body = JSON.stringify(data);
    console.log(data)
    return this.http.post(environment.apiUrl + '/doctor/consultation', data, {'headers':headers})
  }

  getDoctorPatientsWithCOnsultation(): Observable<any> {
    //const headers =  {'Authorization': 'Basic ' + btoa('doctor@gmail.com:mpes')};
    return this.http.get(environment.apiUrl + '/doctor/patients')
  }
}


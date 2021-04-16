import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patients } from '../models/patients.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {


  constructor(private http:HttpClient) { }

  getData(): Patients[]{
    return [
      new Patients("id1","pname1","cons1"),
    new Patients("id2","pname2","cons2")
  ]
  }

}

import { Injectable } from '@angular/core';
import { Patients } from '../models/patients.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor() { }

  getData(): Patients[]{
    return [new Patients("id1","pname1","cons1"),
    new Patients("id2","pname2","cons2")]
  }
}

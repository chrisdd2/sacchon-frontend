import { GlucoseForm } from './../../common/api-info';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientsService } from 'src/app/services/patients.service';

export interface DialogGlucoseData{
  id:number;
  glucose:number;
  date:Date;
  time:string;
}

@Component({
  selector: 'sacchon-patient-add-glucose',
  templateUrl: './patient-add-glucose.component.html',
  styleUrls: ['./patient-add-glucose.component.scss']
})
export class PatientAddGlucoseComponent implements OnInit {
  form:FormGroup;
  reload:boolean;
  id:number=-1;

  constructor(public dialogRef:MatDialogRef<PatientAddGlucoseComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogGlucoseData,
    private patientSrv:PatientsService,
    private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.reload=false;
    this.form = new FormGroup({
      glucose: new FormControl(null,[Validators.min(0),Validators.required]),
      date: new FormControl(new Date(),[Validators.required]),
      time: new FormControl(null,[Validators.required,Validators.pattern("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")])
    });
    console.log(this.data);
    if( this.data ){
      this.id=this.data.id;
      this.form.controls.glucose.setValue(this.data.glucose.toPrecision(2));
      this.form.controls.date.setValue(this.data.date);
      this.form.controls.time.setValue(this.data.time.substr(0,5));
    }
  }
  

  put(){
    const frm:GlucoseForm = { id:this.id,glucoseLevel: this.form.controls.glucose.value, date: new Date(this.form.controls.date.value), time: this.form.controls.time.value +":00" }
    this.patientSrv.putGlucose(frm).subscribe(
      () => {
        this.snackBar.open("Succesfully update","Close",{duration:2000})
        this.dialogRef.close(true);
      },
      (err) => this.snackBar.open(`Error updating: ${err.description}`,"Close",{duration:2000})
    );
  }
  post(){
    const frm:GlucoseForm = {glucoseLevel: this.form.controls.glucose.value, date: this.form.controls.date.value, time: this.form.controls.time.value+":00" }
    this.patientSrv.postGlucose(frm).subscribe(
      () => {
        this.snackBar.open("Succesfully added","Close",{duration:2000})
        this.dialogRef.close(true);
      },
      (err) => this.snackBar.open(`Error saving: ${err.description}`,"Close",{duration:2000})
    );
  }

  onSubmit(){
    if( this.form.invalid ){
      console.log("invalid form");
      return;
    }
    if( this.id > 0 )
      this.put();
    else
      this.post();
  }



}
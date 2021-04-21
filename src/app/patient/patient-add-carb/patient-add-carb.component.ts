import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CarbForm } from './../../common/api-info';
import { PatientsService } from './../../services/patients.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogCarbData {
  id:number;
  carb:number;
  date:Date;
}

@Component({
  selector: 'sacchon-patient-add-carb',
  templateUrl: './patient-add-carb.component.html',
  styleUrls: ['./patient-add-carb.component.scss']
})
export class PatientAddCarbComponent implements OnInit {
  form:FormGroup;
  reload:boolean;
  id:number=-1;

  constructor(public dialogRef:MatDialogRef<PatientAddCarbComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogCarbData,
    private patientSrv:PatientsService,
    private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.reload=false;
    this.form = new FormGroup({
      carb: new FormControl(null,[Validators.min(0),Validators.required]),
      date: new FormControl(new Date(),[Validators.required])
    });
    if( this.data ){
      this.id=this.data.id;
      this.form.controls.carb.setValue(this.data.carb.toFixed(2));
      this.form.controls.date.setValue(this.data.date);
    }
  }
  

  put(){
    console.log("date  "+ this.form.controls.date.value)
    const frm:CarbForm = { id:this.id,carbIntake: this.form.controls.carb.value, date: new Date(this.form.controls.date.value) }
    this.patientSrv.putCarb(frm).subscribe(
      () => {
        this.snackBar.open("Succesfully update","Close",{duration:2000})
        this.dialogRef.close(true);
      },
      (err) => this.snackBar.open(`Error updating: ${err.description}`,"Close",{duration:2000})
    );
  }
  post(){

    console.log("date  "+ this.form.controls.date.value)
    const frm:CarbForm = {carbIntake: this.form.controls.carb.value, date: this.form.controls.date.value }
    this.patientSrv.postCarb(frm).subscribe(
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

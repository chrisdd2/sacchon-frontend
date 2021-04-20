import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CarbForm } from './../../common/api-info';
import { PatientsService } from './../../services/patients.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogResult {
  reload:boolean;
}

@Component({
  selector: 'sacchon-patient-add-carb',
  templateUrl: './patient-add-carb.component.html',
  styleUrls: ['./patient-add-carb.component.scss']
})
export class PatientAddCarbComponent implements OnInit {
  form:FormGroup;
  reload:boolean;

  constructor(public dialogRef:MatDialogRef<PatientAddCarbComponent>,
    private patientSrv:PatientsService,
    private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.reload=false;
    this.form = new FormGroup({
      carb: new FormControl(null,[Validators.min(0),Validators.required]),
      date: new FormControl(new Date(),[Validators.required])
    });
  }

  onSubmit(){
    if( this.form.invalid ){
      console.log("invalid form");
      return;
    }
    const frm:CarbForm = { carbIntake: this.form.controls.carb.value, date: this.form.controls.date.value }
    this.patientSrv.postCarb(frm).subscribe(
      () => {
        this.snackBar.open("Succesfully added",null,{duration:2000})
        this.dialogRef.close(true);
      },
      (err) => this.snackBar.open(`Error saving: ${err.description}`,null,{duration:2000})
    );
  }


}

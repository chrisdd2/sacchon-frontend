import { ConsultationForm } from './../../common/api-info';
import { Consultation } from 'src/app/models/consultation.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarbForm } from 'src/app/common/api-info';
import { PatientsService } from 'src/app/services/patients.service';
import { DoctorService } from 'src/app/services/doctor.service';

export interface ConsultDialogData{
  id:number;
  consult:Consultation;
}

@Component({
  selector: 'sacchon-doctor-consult-add',
  templateUrl: './doctor-consult-add.component.html',
  styleUrls: ['./doctor-consult-add.component.scss']
})
export class DoctorConsultAddComponent implements OnInit {

  form:FormGroup;
  reload:boolean;

  constructor(public dialogRef:MatDialogRef<DoctorConsultAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ConsultDialogData,
    private doctorSrv:DoctorService,
    private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.reload=false;
    this.form = new FormGroup({
      text: new FormControl(null,[Validators.required]),
      date: new FormControl(new Date(),[Validators.required])
    });
    if( this.data.consult ){
      this.form.controls.text.setValue(this.data.consult.consultationText);
      this.form.controls.date.setValue(this.data.consult.date);
    }
  }
  

  put(){
    console.log("date  "+ this.form.controls.date.value)
    const frm:ConsultationForm = { id:this.data.consult.id,text:this.form.controls.text.value, date: new Date(this.form.controls.date.value) }
    this.doctorSrv.putConsult(frm).subscribe(
      () => {
        this.snackBar.open("Succesfully update","Close",{duration:2000})
        this.dialogRef.close(true);
      },
      (err) => this.snackBar.open(`Error updating: ${err.description}`,"Close",{duration:2000})
    );
  }
  post(){
    const frm:ConsultationForm = { id:this.data.id,text:this.form.controls.text.value, date: this.form.controls.date.value };
    this.doctorSrv.postConsult(frm).subscribe(
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
    if( this.data.consult )
      this.put();
    else
      this.post();
  }


}

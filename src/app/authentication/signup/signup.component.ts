import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ɵangular_packages_forms_forms_bh } from '@angular/forms';

@Component({
  selector: 'sacchon-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form:FormGroup;
  account_type:string;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      passwordConfirm: new FormControl()
    })
    this.account_type='';
  }


  onSubmit(){
    console.log(this.form.controls.firstName.value);
  }

}

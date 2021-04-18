import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ɵangular_packages_forms_forms_bh } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sacchon-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form:FormGroup;
  account_type:string;
  error:any;

  constructor(private auth:AuthService,
              private router:Router) { }

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
    if ( this.form.invalid)
      return;
    this.auth.signUp(
      this.form.controls.firstName.value,
      this.form.controls.lastName.value,
      this.form.controls.email.value,
      this.form.controls.password.value,
      this.account_type
    ).subscribe(
      u => {
        console.log(u);
        this.router.navigateByUrl(this.auth.getHomeRoute());
      },
      er => this.error = er
    );
  }

}

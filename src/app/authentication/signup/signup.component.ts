import { ApiError } from './../../models/api-error.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpForm } from 'src/app/common/api-info';


@Component({
  selector: 'sacchon-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form:FormGroup;
  account_type:string;
  error:ApiError;

  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      passwordConfirm: new FormControl()
    },)
    this.account_type='';
  }


  onSubmit(){
    if ( this.form.invalid)
      return;
    const form:SignUpForm={
      firstName:this.form.controls.firstName.value,
      lastName:this.form.controls.lastName.value,
      email:this.form.controls.email.value,
      password:this.form.controls.password.value,
      role:this.account_type
    };
    this.error=null;
    this.auth.signUp(form).subscribe(
      u => {
        console.log(u);
        this.router.navigateByUrl(this.auth.getHomeRoute());
      },
      er => this.error = er
    );
  }

}

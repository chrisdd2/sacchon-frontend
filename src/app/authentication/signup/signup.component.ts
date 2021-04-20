import { ApiError } from './../../models/api-error.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpForm } from 'src/app/common/api-info';


@Component({
  selector: 'sacchon-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  account_type: string;
  error: ApiError;

  constructor(private auth: AuthService,
    private router: Router) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    },  this.passwordValidator );
    this.account_type = '';
  }

  formClear() {
    this.form.reset();
    this.error = null;
  }

  passwordValidator(fg: FormGroup): ValidationErrors | null {
    const p1 = fg.get("password").value;
    const p2 = fg.get("passwordConfirm").value;
    console.log(p1,p2);
    return p1 == p2 ? null : { passwordMatch:true};
  }

  onSubmit() {
    console.log(this.form.invalid);
    console.log(this.form);
    if (this.form.invalid)
      return;
    const form: SignUpForm = {
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
      role: this.account_type
    };
    this.error = null;
    this.auth.signUp(form).subscribe(
      u => {
        console.log(u);
        this.router.navigateByUrl(this.auth.getHomeRoute());
      },
      er => this.error = er
    );
  }

}

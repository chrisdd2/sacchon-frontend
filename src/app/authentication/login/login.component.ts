import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiError } from 'src/app/models/api-error.model';

@Component({
  selector: 'sacchon-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loggingIn: boolean;
  error: ApiError;

  constructor(private auth: AuthService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.loggingIn = false;
    this.form = this.fb.group({
      usr: new FormControl(null,Validators.required),
      pwd: new FormControl(null,Validators.required)
    })
  }

  onSubmit() {
    console.log(this.form.controls);
    if (this.form.invalid)
      return;
    this.auth.logIn(this.form.controls.usr.value, this.form.controls.pwd.value)
      .subscribe(
        u => {
          console.log('succesfull login', u);
          this.router.navigateByUrl(this.auth.getHomeRoute());
        },
        (err: ApiError) => {
          this.error = err;
        }
      )
  }
}

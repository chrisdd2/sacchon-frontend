import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sacchon-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loggingIn: boolean;
  error: any;

  constructor(private auth: AuthService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.loggingIn = false;
    this.form = this.fb.group({
      usr: ['', [Validators.required]],
      pwd: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.form.invalid)
      return;
    this.auth.logIn(this.form.controls.usr.value, this.form.controls.pwd.value)
      .subscribe(
        u => {
          console.log('succesfull login', u);
          this.router.navigateByUrl(this.auth.getHomeRoute());
        },
        er => {
          this.error = {message: er.error};
        }
      )
  }
}

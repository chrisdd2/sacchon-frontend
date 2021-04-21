import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sacchon-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  matLogin: any;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(! this.auth.isLoggedIn())
      this.router.navigateByUrl("/");
    this.auth.userSubject.subscribe(u => {
      this.user = u;
    });
  }

  logOut() {
    this.auth.logOut();
    this.router.navigateByUrl('/');
  }
}

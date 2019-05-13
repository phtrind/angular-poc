import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;
  username: string;

  constructor(public authService: AuthService) {
    this.authService.user.subscribe(x => {
      if (this.authService.isLogged) {
        this.username = x.displayName;
      }
    });
  }

  ngOnInit() {
  }

  loginEmailPassword(): void {

  }

  loginGoogle(): void {
    this.authService.loginGoogle();
  }

  loginFacebook(): void {
    this.authService.loginFacebook();
  }

  logout(): void {
    this.authService.logout();
  }

}

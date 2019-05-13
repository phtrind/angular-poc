import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;

  constructor(private router: Router, public authService: AuthService) {
    this.authService.user.subscribe(x => {
      if (this.authService.isLogged) {
        this.username = x.displayName;
      }
    });
  }

  ngOnInit() {
  }

  btnLoginClick(): void {
    this.router.navigateByUrl('login');
  }

  btnLogoutClick(): void {
    this.authService.logout();
  }

}

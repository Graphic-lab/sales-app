import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../auth/auth.service';
import { User } from '../auth/auth.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  ngOnInit(): any {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  logout(): any {
    this.authenticationService.logout();
    this.router.navigate(['/auth']);
    console.log('clicked: logout thanks');
  }
}

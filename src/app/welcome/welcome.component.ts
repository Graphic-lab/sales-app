import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';
import { UserService } from '../auth/user.service';
import { User } from '../auth/auth.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent implements OnInit {
  currentUser: User;
  userChanged: any;
  userChangedSub: Subscription;
  
  constructor(
    private authenticationService: AuthenticationService,
    ) {}

  ngOnInit(): any {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
}

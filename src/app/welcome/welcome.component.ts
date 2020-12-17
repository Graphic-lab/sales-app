import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../auth/auth.service";
import { User } from "../auth/auth.model";
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService
  ) {
  }
  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    console.log("currentUser === ", this.currentUser);
    
  }
}

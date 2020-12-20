import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../auth/auth.service';
import { UserService } from '../auth/user.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
      
    }
  }

  ngOnInit(): any {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f(): any {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.userService
      .register(this.loginForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          // this.alertService.success('Registration successful', true);
          this.router.navigate(['/welcome']);
        },
        (error) => {
          // this.alertService.error(error);
          this.loading = false;
        }
    );

    this.router.navigate(['/welcome']);
    this.authenticationService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                // this.alertService.error(error);
                this.loading = false;
            });
  }
}

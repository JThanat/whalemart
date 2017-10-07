import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginError, LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  forceShowError = false;
  isLoggingIn = false;
  errorReason: string | undefined = undefined;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    this.forceShowError = true;
    this.isLoggingIn = true;
    this.errorReason = undefined;
    this.loginForm.disable();

    const username = this.loginForm.value.username as string;
    const password = this.loginForm.value.password as string;
    this.loginService.login(username, password).subscribe(userInfo => {
      // TODO: Switch to proper centralized alert service
      alert(`Login successfully as ${userInfo.username}.`);
      this.router.navigate(['/']);
    }, err => {
      this.loginForm.enable();
      this.isLoggingIn = false;
      if (err instanceof LoginError) {
        this.errorReason = err.reason;
      } else {
        this.errorReason = undefined;
        // TODO: Properly handle an error
        console.error(err);
      }
    });
  }
}

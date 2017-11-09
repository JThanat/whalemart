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
  errorReason: string | undefined = undefined;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    this.errorReason = undefined;
    this.loginForm.disable();

    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;
    this.loginService.login(email, password).subscribe(userInfo => {
      // TODO: Switch to proper centralized alert service
      alert(`Login successfully as ${userInfo.email}.`);
      this.router.navigate(['/']);
    }, err => {
      this.loginForm.enable();
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

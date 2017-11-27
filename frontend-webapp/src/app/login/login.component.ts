import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../core/alert/alert.service';
import { IntercomponentDataService } from '../core/utils/intercomponent-data.service';
import { FacebookLoginService } from './facebook-login.service';
import { InvalidLoginCredentialError, LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  isFb = false;
  fbAccessToken: string | undefined = undefined;
  fbUserId: string | undefined = undefined;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private alert: AlertService,
    private fbLoginService: FacebookLoginService,
    private intercomponentDataService: IntercomponentDataService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    this.fbLoginService.ensureFbScriptLoad();
  }

  login() {
    this.loginForm.updateValueAndValidity();
    console.log(this.loginForm.value);

    if (!this.loginForm.valid) {
      return;
    }

    this.alert.close();
    this.loginForm.disable();

    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;
    this.loginService.login(email, password).subscribe(userInfo => {
      this.alert.show({ message: 'เข้าสู่ระบบสำเร็จ', type: 'success' });
      this.router.navigate(['/']);
    }, err => {
      this.loginForm.enable();
      if (err instanceof InvalidLoginCredentialError) {
        this.alert.show({
          message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
          type: 'danger'
        });
      } else {
        throw err;
      }
    });
  }

  loginWithFacebook() {
    this.fbLoginService.loginFacebook().subscribe(result => {
      if (!result.success) {
        return;
      }

      if (result.requireRegistration) {
        this.intercomponentDataService.set('fbRegister', result.registrationInfo);
        this.router.navigate(['/register/facebook']);
      } else {
        this.alert.show({ message: 'เข้าสู่ระบบสำเร็จ', type: 'success' });
        this.router.navigate(['/']);
      }
    });
  }
}

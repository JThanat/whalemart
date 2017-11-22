import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../core/alert/alert.service';
import {
  IntercomponentDataMap,
  IntercomponentDataService
} from '../core/utils/intercomponent-data.service';
import { BaseRegisterComponent } from './base-register.component';
import { RegisterService } from './register.service';

@Component({
  templateUrl: './facebook-register.component.html',
  styleUrls: ['./register.component.scss']
})
export class FacebookRegisterComponent extends BaseRegisterComponent implements OnInit {
  fbRegisterData: IntercomponentDataMap['fbRegister'];

  constructor(
    registerService: RegisterService,
    router: Router,
    alert: AlertService,
    private intercomponentDataService: IntercomponentDataService
  ) {
    super(registerService, router, alert);
  }

  ngOnInit() {
    super.ngOnInit();
    this.fbRegisterData = this.intercomponentDataService.get('fbRegister');
    this.registerForm.patchValue({
      firstName: this.fbRegisterData.firstName,
      lastName: this.fbRegisterData.lastName,
      email: this.fbRegisterData.email || ''
    });
    this.registerForm.controls.firstName.markAsTouched();
    this.registerForm.controls.lastName.markAsTouched();
    if (this.fbRegisterData.email) {
      this.registerForm.controls.email.markAsTouched();
    }
  }

  protected registerInternally() {
    const { email, firstName, lastName, password, phone } = this.registerForm.value;
    return this.registerService.registerWithFacebook({
      email, firstName, lastName, password, phone,
      fbAccessToken: this.fbRegisterData.fbAccessToken
    });
  }
}

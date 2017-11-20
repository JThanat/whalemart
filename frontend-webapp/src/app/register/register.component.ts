import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../core/alert/alert.service';
import { BaseRegisterComponent } from './base-register.component';
import { RegisterService } from './register.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseRegisterComponent {
  constructor(
    registerService: RegisterService,
    router: Router,
    alert: AlertService
  ) {
    super(registerService, router, alert);
  }

  protected registerInternally() {
    const { email, firstName, lastName, password, phone } = this.registerForm.value;
    return this.registerService.register({ email, firstName, lastName, password, phone });
  }
}

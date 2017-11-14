import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../core/alert/alert.service';
import { RegisterError, RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.email], [this.registerService.emailValidator]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    }, { updateOn: 'blur' });
  }

  register() {
    this.registerForm.updateValueAndValidity();

    if (!this.registerForm.valid) {
      return;
    }

    this.registerForm.disable();

    const { email, firstName, lastName, password, phone } = this.registerForm.value;
    this.registerService.register({ email, firstName, lastName, password, phone }).subscribe(() => {
      this.alert.show({ message: 'สมัครสมาชิกสำเร็จ', type: 'success' });
      this.router.navigate(['/']);
    }, err => {
      this.registerForm.enable();
      if (err instanceof RegisterError) {
        switch (err.reason) {
          case 'INVALID': {
            this.alert.show({
              message: 'ข้อมูลไม่ถูกต้อง',
              type: 'danger'
            });
            break;
          }
          default: {
            this.alert.show({
              message: `เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ: ${err.reason}`,
              type: 'danger'
            });
          }
        }
      } else {
        throw err;
      }
    });
  }
}

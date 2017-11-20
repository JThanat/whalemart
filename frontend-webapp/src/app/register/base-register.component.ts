import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AlertService } from '../core/alert/alert.service';
import { RegisterError, RegisterService } from './register.service';

export abstract class BaseRegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    protected registerService: RegisterService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.email], [this.registerService.emailValidator]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/\+?\d{9,15}$/)])
    }, { updateOn: 'blur' });
  }

  register() {
    this.registerForm.updateValueAndValidity();

    if (!this.registerForm.valid) {
      return;
    }

    this.registerForm.disable();

    this.registerInternally().subscribe(() => {
      this.alert.show({ message: 'สมัครสมาชิกสำเร็จ', type: 'success' });
      this.router.navigate(['/login']);
    }, err => {
      this.registerForm.enable();
      if (err instanceof RegisterError) {
        this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' });
      } else {
        throw err;
      }
    });
  }

  protected abstract registerInternally(): Observable<true>;
}

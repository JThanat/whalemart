import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterError, RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  forceShowError = false;
  isRegistering = false;
  errorReason: string | undefined = undefined;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: this.fb.control('', [Validators.email]),
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required])
    });
  }

  register() {
    this.forceShowError = true;

    if (!this.registerForm.valid) {
      return;
    }

    this.registerForm.disable();
    this.isRegistering = true;

    const { email, firstName, lastName, password, phone } = this.registerForm.value;
    this.registerService.register({ email, firstName, lastName, password, phone }).subscribe(() => {
      // TODO: Switch to proper centralized alert service
      alert(`Register successfully.`);
      this.router.navigate(['/']);
    }, err => {
      this.registerForm.enable();
      this.isRegistering = false;
      if (err instanceof RegisterError) {
        this.errorReason = err.reason;
      } else {
        this.errorReason = undefined;
        // TODO: Properly handle an error
        console.error(err);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private registerService: RegisterService, private router: Router) { }

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

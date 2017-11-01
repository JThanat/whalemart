import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      passwordConfirm: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required])
    }, { validator: [this.passwordConfirmMatcher] });
    console.log(this.registerForm);
  }

  passwordConfirmMatcher: ValidatorFn = (g: FormGroup) => {
    const password = g.controls.password.value as string;
    const passwordConfirm = g.controls.passwordConfirm.value as string;
    if (password === passwordConfirm) {
      return null;
    }
    return {
      passwordMismatch: true
    };
  }

  register() {
    alert('Register!');
  }
}

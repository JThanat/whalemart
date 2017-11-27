import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

export const lessorForm = new FormGroup({
  lessorName: new FormControl('', [Validators.required]),
  isOrganization: new FormControl(false),
  organizationName: new FormControl('', [Validators.required]),
  organizationContactName: new FormControl('', [Validators.required]),
  organizationEmail: new FormControl('', [Validators.required, Validators.email]),
  organizationPhone: new FormControl(
    '',
    [Validators.required, Validators.pattern(/^\+?\d{9,15}$/)]
  )
});

@Component({
  selector: 'app-lessor-form',
  templateUrl: './lessor-form.component.html',
  styleUrls: ['./lessor-form.component.scss']
})
export class LessorFormComponent implements OnInit {
  lessorForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.lessorForm = lessorForm;

    this.lessorForm.controls['isOrganization'].valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(isOrganization => {
      this.setValidateOnOrganization(isOrganization);
    });

    this.setValidateOnOrganization(false);
  }

  private setValidateOnOrganization(isOrganization: Boolean) {
    const fields: string[] = [
      'organizationName',
      'organizationContactName',
      'organizationEmail',
      'organizationPhone'
    ];

    for (let i = 0; i < fields.length; i++) {
      if (isOrganization) {
        this.lessorForm.controls[fields[i]].enable();
      } else {
        this.lessorForm.controls[fields[i]].disable();
      }
    }
  }

  submit() {
    for (const key in this.lessorForm.controls) {
      if (key in this.lessorForm.controls) {
        this.lessorForm.controls[key].markAsTouched();
      }
    }
  }

  get form(): FormGroup {
    return this.lessorForm;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { BecomeLessorService } from './become-lessor.service'
// import { Router } from '@angular/router';

@Component({
  selector: 'app-become-lessor',
  templateUrl: './become-lessor.component.html',
  styleUrls: ['./become-lessor.component.scss'],
})
export class BecomeLessorComponent implements OnInit {
  becomeLessorForm: FormGroup;
  isOrganization: Boolean;

  constructor(
    // private router: Router
  ) { }

  ngOnInit() {
    this.becomeLessorForm = new FormGroup({
      lessorName: new FormControl('', [Validators.required]),
      isOrganization: new FormControl('', [Validators.required]),
      organizationName: new FormControl('', [Validators.required]),
      organizationContactName: new FormControl('', [Validators.required]),
      organizationEmail: new FormControl('', [Validators.required]),
      organizationPhone: new FormControl('', [Validators.required]),
    }, { updateOn: 'blur' });

    this.isOrganization = false;
    this.setValidateOnOrganization(this.isOrganization);
  }

  toggleIsOrganization() {
    this.isOrganization = !this.isOrganization;
    this.setValidateOnOrganization(this.isOrganization);
  }

  setValidateOnOrganization(isEnable: Boolean) {
    const fields: string[] = [
      'organizationName',
      'organizationContactName',
      'organizationEmail',
      'organizationPhone'
    ];

    for (const field in fields) {
      if (isEnable) {
        this.becomeLessorForm.controls[field].enable();
      } else {
        this.becomeLessorForm.controls[field].disable();
      }
    }
  }

  becomeLessor() {
    this.becomeLessorForm.updateValueAndValidity();

    if (!this.becomeLessorForm.valid) {
      return ;
    }

    // const { 
    //   lessorName, isOrganization, organizationName, organizationContactName,
    //   organizationEmail, organizationPhone      
    // } = this.becomeLessorForm.value;

    
  }
}

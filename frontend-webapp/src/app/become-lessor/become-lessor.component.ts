import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../core/alert/alert.service';
import { BecomeLessorService } from './become-lessor.service';

@Component({
  selector: 'app-become-lessor',
  templateUrl: './become-lessor.component.html',
  styleUrls: ['./become-lessor.component.scss']
})
export class BecomeLessorComponent implements OnInit {
  becomeLessorForm: FormGroup;
  isOrganization: Boolean;
  loadingStatus: string | undefined = undefined;

  constructor(
    private becomeLessorService: BecomeLessorService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.becomeLessorService.checkLessorStatus().subscribe(status => {
      this.loadingStatus = status;
    }, (err: any) => {
      this.alert.show({ message: 'ไม่สามารถโหลดข้อมูลได้', type: 'danger' });
    });

    this.becomeLessorForm = new FormGroup({
      lessorName: new FormControl('', [Validators.required]),
      isOrganization: new FormControl('', [Validators.required]),
      organizationName: new FormControl('', [Validators.required]),
      organizationContactName: new FormControl('', [Validators.required]),
      organizationEmail: new FormControl('', [Validators.required, Validators.email]),
      organizationPhone: new FormControl(
        '',
        [Validators.required, Validators.pattern(/\+?\d{9,15}$/)]
      )
    }, { updateOn: 'blur' });

    this.isOrganization = false;
    this.setValidateOnOrganization(this.isOrganization);
  }

  toggleIsOrganization() {
    this.isOrganization = !this.isOrganization;
    this.setValidateOnOrganization(this.isOrganization);
  }

  setValidateOnOrganization(isOrganization: Boolean) {
    const fields: string[] = [
      'organizationName',
      'organizationContactName',
      'organizationEmail',
      'organizationPhone'
    ];

    this.becomeLessorForm.controls['isOrganization'].setValue(isOrganization);

    for (let i = 0; i < fields.length; i++) {
      if (isOrganization) {
        this.becomeLessorForm.controls[fields[i]].enable();
      } else {
        this.becomeLessorForm.controls[fields[i]].disable();
      }
    }
  }

  becomeLessor() {
    this.becomeLessorForm.updateValueAndValidity();

    console.log(this.becomeLessorForm);

    if (!this.becomeLessorForm.valid) {
      return ;
    }

    this.becomeLessorForm.disable();

    const {
      lessorName,
      isOrganization,
      organizationName,
      organizationContactName,
      organizationEmail,
      organizationPhone
    } = this.becomeLessorForm.value;

    this.becomeLessorService.becomeLessor({
      lessor_name: lessorName,
      is_organization: isOrganization,
      organization_name: organizationName,
      organization_contact_name: organizationContactName,
      organization_email: organizationEmail,
      organization_phone_number: organizationPhone
    }).subscribe(() => {
      // TODO: Redirect to lessor profile
      this.alert.show({ message: 'สมัครผู้ให้เช่าตลาดสมบูรณ์', type: 'success' });
    }, err => {
      this.becomeLessorForm.enable();
      this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' });
    });
  }
}

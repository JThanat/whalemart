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
  loadingStatus: string;

  constructor(
    private becomeLessorService: BecomeLessorService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.becomeLessorService.checkLessorStatus().subscribe((status: string) => {
      console.log(status);
      this.loadingStatus = status;
    }, (err: any) => {
      this.alert.show({ message: 'ไม่สามารถโหลดข้อมูลได้', type: 'danger' });
    });

    this.becomeLessorForm = new FormGroup({
      lessorName: new FormControl('', [Validators.required]),
      isOrganization: new FormControl('', [Validators.required]),
      organizationName: new FormControl('', [Validators.required]),
      organizationContactName: new FormControl('', [Validators.required]),
      organizationEmail: new FormControl('', [Validators.required]),
      organizationPhone: new FormControl('', [Validators.required])
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

    for (let i = 0; i < fields.length; i++) {
      if (isEnable) {
        this.becomeLessorForm.controls[fields[i]].enable();
      } else {
        this.becomeLessorForm.controls[fields[i]].disable();
      }
    }
  }

  becomeLessor() {
    this.becomeLessorForm.updateValueAndValidity();

    if (!this.becomeLessorForm.valid) {
      return ;
    } else {
      alert('pass');
    }
  }
}

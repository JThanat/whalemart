import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { AlertService } from '../core/alert/alert.service';
import { BecomeLessorService, LessorStatus } from './become-lessor.service';

@Component({
  selector: 'app-become-lessor',
  templateUrl: './become-lessor.component.html',
  styleUrls: ['./become-lessor.component.scss']
})
export class BecomeLessorComponent implements OnInit {
  becomeLessorForm: FormGroup;
  lessorStatus$: Observable<LessorStatus>;

  constructor(
    private becomeLessorService: BecomeLessorService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.lessorStatus$ = this.route.data.pipe(map(data => data.lessorStatus));

    this.becomeLessorForm = new FormGroup({
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

    this.becomeLessorForm.controls['isOrganization'].valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(isOrganization => {
      this.setValidateOnOrganization(isOrganization);
    });

    this.setValidateOnOrganization(false);
  }

  setValidateOnOrganization(isOrganization: Boolean) {
    const fields: string[] = [
      'organizationName',
      'organizationContactName',
      'organizationEmail',
      'organizationPhone'
    ];

    for (let i = 0; i < fields.length; i++) {
      if (isOrganization) {
        this.becomeLessorForm.controls[fields[i]].enable();
      } else {
        this.becomeLessorForm.controls[fields[i]].disable();
      }
    }
  }

  becomeLessor() {
    if (!this.becomeLessorForm.valid) {
      return;
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
      this.router.navigate(['/lessor']);
      this.alert.show({ message: 'สมัครผู้ให้เช่าตลาดสมบูรณ์', type: 'success' });
    }, err => {
      this.becomeLessorForm.enable();
      this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' });
    });
  }
}

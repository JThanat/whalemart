import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AlertService } from '../core/alert/alert.service';
import { BecomeLessorService, LessorStatus } from './become-lessor.service';
import { LessorFormComponent } from './form/lessor-form.component';

@Component({
  selector: 'app-become-lessor',
  templateUrl: './become-lessor.component.html',
  styleUrls: ['./become-lessor.component.scss']
})
export class BecomeLessorComponent implements OnInit, AfterViewInit {
  @ViewChild(LessorFormComponent) lessorFormComponent: LessorFormComponent;
  becomeLessorForm: FormGroup;
  lessorStatus$: Observable<LessorStatus>;

  constructor(
    private becomeLessorService: BecomeLessorService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.lessorStatus$ = this.route.data.pipe(map(data => data.lessorStatus));
  }

  ngAfterViewInit() {
    // Fix: https://github.com/angular/angular/issues/6005
    setTimeout(() => this.becomeLessorForm = this.lessorFormComponent.form);
  }

  becomeLessor() {
    this.lessorFormComponent.submit();

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

    this.becomeLessorService
      .becomeLessor({
        lessor_name: lessorName,
        is_organization: isOrganization,
        organization_name: organizationName,
        organization_contact_name: organizationContactName,
        organization_email: organizationEmail,
        organization_phone_number: organizationPhone
      })
      .subscribe(
        () => {
          this.router.navigate(['/lessor']);
          this.alert.show({
            message: 'สมัครผู้ให้เช่าตลาดสมบูรณ์',
            type: 'success'
          });
        },
        err => {
          this.becomeLessorForm.enable();
          this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' });
        }
      );
  }
}

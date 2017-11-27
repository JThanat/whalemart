import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { mergeMap } from 'rxjs/operators';
import { AlertService } from '../../core/alert/alert.service';
import {
  LessorProfile,
  LessorService
} from '../../lessor-dashboard/lessor.service';
import { LessorFormComponent } from '../../shared/user/lessor-form/lessor-form.component';
import { VendorProfile, VendorProfileService } from './vendor-profile.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit, AfterViewInit {
  @ViewChild(LessorFormComponent) lessorFormComponent: LessorFormComponent;
  @Input() isLessor = false;

  vendorProfile: VendorProfile;
  lessorProfile: LessorProfile;
  vendorProfileForm: FormGroup;
  lessorProfileForm: FormGroup;
  isEdit = false;

  constructor(
    private vendorProfileService: VendorProfileService,
    private lessorService: LessorService,
    private alert: AlertService,
    private route: ActivatedRoute
  ) {}

  loadData() {
    this.vendorProfileService.getVendorProfile().subscribe(
      data => this.vendorProfile = data,
      err => this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' })
    );
    if (this.isLessor) {
      this.lessorService.getLessorProfile$.subscribe(
        data => {
          this.lessorProfile = data;
        },
        err => this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' })
      );
    }
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.vendorProfile = data.vendorProfile;
    });
    this.loadData();

    this.vendorProfileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?\d{9,15}$/)
      ]),
      profileImage: new FormControl()
    });
  }

  ngAfterViewInit() {
    // Fix: https://github.com/angular/angular/issues/6005
    setTimeout(() => {
      if (this.isLessor) {
        if (this.lessorFormComponent) {
          this.lessorProfileForm = this.lessorFormComponent.form;
          if (this.isEdit && this.lessorProfile) {
            this.lessorProfileForm.reset(this.lessorProfile);
          }
        }
      }
    });
  }

  setEditProfile(isEdit: boolean) {
    this.isEdit = isEdit;

    if (isEdit) {
      this.vendorProfileForm.reset(this.vendorProfile);
      this.ngAfterViewInit();
    }
  }

  updateProfile() {
    if (this.lessorFormComponent) {
      this.lessorFormComponent.submit();
    }

    if (
      !this.vendorProfileForm.valid ||
      (this.lessorProfileForm && !this.lessorProfileForm.valid)
    ) {
      return;
    }

    this.vendorProfileForm.disable();

    let lessorUpdateProfile$: Observable<any>;
    if (this.lessorProfileForm) {
      this.lessorProfileForm.disable();

      const {
        lessorName,
        isOrganization,
        organizationName,
        organizationContactName,
        organizationEmail,
        organizationPhoneNumber
      } = this.lessorProfileForm.value;

      lessorUpdateProfile$ = this.lessorService.updateLessorProfile$({
        lessor_name: lessorName,
        is_organization: isOrganization,
        organization_name: organizationName,
        organization_contact_name: organizationContactName,
        organization_email: organizationEmail,
        organization_phone_number: organizationPhoneNumber
      });
    }

    const {
      firstName,
      lastName,
      phone,
      profileImage
    } = this.vendorProfileForm.value;

    this.vendorProfileService
      .updateVendorProfile({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        profile_image: profileImage ? profileImage[0] : null
      })
      .pipe(
        mergeMap(
          () =>
            this.lessorProfileForm ? lessorUpdateProfile$ : observableOf(true)
        )
      )
      .subscribe(
        () => {
          this.isEdit = false;
          this.vendorProfileForm.enable();
          if (this.lessorProfileForm) {
            this.lessorProfileForm.enable();
          }
          this.loadData();
        },
        err => {
          this.vendorProfileForm.enable();
          this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' });
        }
      );
  }
}

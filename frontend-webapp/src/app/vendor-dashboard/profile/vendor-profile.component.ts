import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from '../../core/alert/alert.service';
import { VendorProfile, VendorProfileService } from './vendor-profile.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit, OnDestroy {
  vendorProfileSubscription: Subscription;
  vendorProfile: VendorProfile;
  vendorProfileForm: FormGroup;
  isEdit = false;

  constructor(
    private vendorProfileService: VendorProfileService,
    private alert: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.vendorProfileSubscription = this.route.data
      .pipe(map(data => data.vendorProfile))
      .subscribe(data => {
        this.vendorProfile = data;
      });

    this.vendorProfileForm = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{9,15}$/)]),
        profileImage: new FormControl()
      },
      { updateOn: 'blur' }
    );
  }

  setEditProfile(isEdit: boolean) {
    this.isEdit = isEdit;

    if (isEdit) {
      this.vendorProfileForm.reset(this.vendorProfile);
    }
  }

  updateProfile() {
    if (!this.vendorProfileForm.valid) {
      return;
    }

    this.vendorProfileForm.disable();

    const { firstName, lastName, phone } = this.vendorProfileForm.value;

    this.vendorProfileService
      .updateVendorProfile({
        first_name: firstName,
        last_name: lastName,
        phone: phone
      })
      .subscribe(
        () => {
          this.vendorProfileForm.enable();
          this.alert.show({ message: 'อัพเดทเสร็จสมบูรณ์', type: 'success' });
        },
        err => {
          this.vendorProfileForm.enable();
          this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' });
        }
      );
  }

  ngOnDestroy() {
    this.vendorProfileSubscription.unsubscribe();
  }
}

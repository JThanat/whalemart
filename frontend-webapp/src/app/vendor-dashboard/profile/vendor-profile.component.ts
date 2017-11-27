import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AlertService } from '../../core/alert/alert.service';
import { VendorProfile, VendorProfileService } from './vendor-profile.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {
  vendorProfile: VendorProfile;
  vendorProfileForm: FormGroup;
  isEdit = false;

  constructor(
    private vendorProfileService: VendorProfileService,
    private alert: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.vendorProfile = data.vendorProfile;
    });

    this.vendorProfileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{9,15}$/)]),
      profileImage: new FormControl()
    });
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

    const { firstName, lastName, phone, profileImage } = this.vendorProfileForm.value;

    this.vendorProfileService
      .updateVendorProfile({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        profile_image: profileImage ? profileImage[0] : null
      })
      .subscribe(
        () => {
          this.alert.show({ message: 'อัพเดทเสร็จสมบูรณ์', type: 'success' });
          location.reload();
        },
        err => {
          this.vendorProfileForm.enable();
          this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' });
        }
      );
  }
}

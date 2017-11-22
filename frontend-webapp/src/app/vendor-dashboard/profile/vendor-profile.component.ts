import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../core/alert/alert.service';
import { VendorProfileService } from './vendor-profile.service';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {
  vendorProfileForm: FormGroup;
  isEdit = false;

  constructor(
    private vendorProfileService: VendorProfileService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.vendorProfileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{9,15}$/)])
    }, { updateOn: 'blur' });
  }

  toggleEditProfile(isEdit: boolean) {
    this.isEdit = isEdit;
  }

  updateProfile() {
    if (!this.vendorProfileForm.valid) {
      return;
    }

    this.vendorProfileForm.disable();

    const {
      firstName,
      lastName,
      phone
    } = this.vendorProfileForm.value;

    this.vendorProfileService.updateVendorProfile({
      first_name: firstName,
      last_name: lastName,
      phone: phone
    }).subscribe(() => {
      // TODO: Redirect to lessor profile
      this.alert.show({ message: 'สมัครผู้ให้เช่าตลาดสมบูรณ์', type: 'success' });
    }, err => {
      this.vendorProfileForm.enable();
      this.alert.show({ message: 'เกิดข้อผิดพลาด', type: 'danger' });
    });
  }

}

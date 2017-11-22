import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

// import { AlertService } from '../../core/alert/alert.service';
import { VendorProfile } from './vendor-profile.service';

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
    // private vendorProfileService: VendorProfileService,
    // private alert: AlertService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.vendorProfileSubscription = this.route.data
      .pipe(map(data => data.vendorProfile))
      .subscribe(data => {
        this.vendorProfile = data;
      });

    this.vendorProfileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{9,15}$/)])
    }, { updateOn: 'blur' });
  }

  setEditProfile(isEdit: boolean) {
    this.isEdit = isEdit;

    if (isEdit) {
      this.vendorProfileForm.reset(this.vendorProfile);
    }
  }

  ngOnDestroy() {
    this.vendorProfileSubscription.unsubscribe();
  }
}

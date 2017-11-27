import { Component, OnInit } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../core/alert/alert.service';
import { DateRange } from '../../core/utils/date-range.service';
import { CreateMarketService } from './create-market.service';

interface ValidCreateMarketFormValue {
  name: string;
  caption: string;
  description: string;
  dateRange: DateRange;
  openingTime: Date;
  closingTime: Date;
  contactPersonFullname: string;
  contactPersonPhoneNumber: string;
  contactPersonEmail: string;
  location: string;
  locationLatLng: string;
  termsAndCondition: string;
  depositPaymentDue: Date;
  fullPaymentDue: Date;
  reservationDue: Date;
  estimateVisitor: string;
  layoutPhoto: FileList;
  providedAccessories: {
    name: string;
    amount: string;
  }[];
  coverPhoto: FileList;
  scenePhotos: FileList;
  tags: string;
  booths: {
    name: string;
    price: string;
  }[];
}

@Component({
  selector: 'app-create-market',
  templateUrl: './create-market.component.html',
  styleUrls: ['./create-market.component.scss']
})
export class CreateMarketComponent implements OnInit {
  createMarketForm: FormGroup;
  providedAccessoriesForm: FormArray;
  boothsForm: FormArray;

  constructor(
    private createMarketService: CreateMarketService,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.providedAccessoriesForm = new FormArray([]);
    this.boothsForm = new FormArray([], [this.validateBoothNames]);

    this.createMarketForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      caption: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      dateRange: new FormControl(null, [Validators.required]),
      // TODO: Use appropriate type openingTime and closingTime with corresponding form control.
      openingTime: new FormControl('', [Validators.required]),
      closingTime: new FormControl('', [Validators.required]),
      contactPersonFullname: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      contactPersonPhoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?\d{9,15}$/)
      ]),
      contactPersonEmail: new FormControl('', [Validators.email, Validators.maxLength(254)]),
      location: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      locationLatLng: new FormControl('', [
        Validators.required,
        Validators.pattern(/^-?\d+(\.\d+)?, -?\d+(\.\d+)?$/)
      ]),
      termsAndCondition: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      depositPaymentDue: new FormControl(null, [Validators.required]),
      fullPaymentDue: new FormControl(null, [Validators.required]),
      reservationDue: new FormControl(null, [Validators.required]),
      estimateVisitor: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,10}$/)]),
      layoutPhoto: new FormControl(null, [Validators.required]),
      providedAccessories: this.providedAccessoriesForm,
      coverPhoto: new FormControl(null, [Validators.required]),
      scenePhotos: new FormControl(null, [Validators.required]),
      tags: new FormControl('', [this.createMarketService.tagsValidators]),
      booths: this.boothsForm
    });

    // Add initial controls
    this.addProvidedAccessory();
    this.addBooth();
  }

  addProvidedAccessory() {
    this.providedAccessoriesForm.push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        amount: new FormControl('1', [Validators.required, Validators.pattern(/^\d+$/)])
      })
    );
  }

  removeProvidedAccessory(index: number) {
    this.providedAccessoriesForm.removeAt(index);
  }

  addBooth() {
    const nextBoothName = String('A' + (this.boothsForm.length + 1));
    this.boothsForm.push(
      new FormGroup({
        name: new FormControl(nextBoothName, [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]+$/)
        ]),
        price: new FormControl('100', [Validators.required, Validators.pattern(/^\d+$/)])
      })
    );
  }

  removeBooth(index: number) {
    this.boothsForm.removeAt(index);
  }

  createMarket() {
    if (!this.createMarketForm.valid) {
      return;
    }

    const value = this.createMarketForm.value as ValidCreateMarketFormValue;

    const [lat, lng] = value.locationLatLng.trim().split(',');

    this.createMarketForm.disable();
    this.createMarketService
      .createMarket({
        name: value.name,
        caption: value.caption,
        description: value.description,
        dateRange: value.dateRange,
        openingTime: value.openingTime,
        closingTime: value.closingTime,
        contactPersonFullname: value.contactPersonFullname,
        contactPersonPhoneNumber: value.contactPersonPhoneNumber,
        contactPersonEmail: value.contactPersonEmail,
        location: value.location,
        locationLatLng: {
          latitude: Number(lat),
          longitude: Number(lng)
        },
        termsAndCondition: value.termsAndCondition,
        depositPaymentDue: value.depositPaymentDue,
        fullPaymentDue: value.fullPaymentDue,
        reservationDue: value.reservationDue,
        estimateVisitor: Number(value.estimateVisitor),
        layoutPhoto: value.layoutPhoto[0],
        providedAccessories: value.providedAccessories,
        coverPhoto: value.coverPhoto[0],
        scenePhotos: value.scenePhotos,
        tags: this.createMarketService.normalizeTags(value.tags),
        booths: value.booths
      })
      .subscribe(newMarketId => {
        this.alert.show({ message: 'สร้างตลาดสำเร็จ', type: 'success' });
        this.router.navigate(['market', newMarketId]);
      });
  }

  private validateBoothNames: ValidatorFn = (c: AbstractControl) => {
    const booths = (c as FormArray).value as { name: string }[];
    const names = booths.map(booth => booth.name);

    const nameChecker = new Set<string>();
    for (const name of names) {
      if (nameChecker.has(name)) {
        return { boothName: name };
      }
      nameChecker.add(name);
    }

    return null;
  };
}

import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { DateRange } from '../../core/utils/date-range.service';
import { TimeService } from '../../core/utils/time.service';
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

  constructor(private createMarketService: CreateMarketService, private timeService: TimeService) {}

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

    this.prepopulateData();
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
    console.log(this.createMarketForm.value as ValidCreateMarketFormValue);
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
  }

  private prepopulateData() {
    setTimeout(() => {
      // tslint:disable:max-line-length
      this.createMarketForm.patchValue({
        name: 'เอเชียทีค',
        caption: 'แหล่งท่องเที่ยวและช้อปปิ้งสไตล์ริมแม่น้ำเจ้าพระยาแห่งแรก',
        description:
          'แลนด์มาร์คใหม่ล่าสุดของกรุงเทพฯ กับบรรยากาศร่วมสมัย ผสมกลิ่นอายความเป็นตะวันออกและตะวันตกของมหานครแห่งสายน้ำเจ้าพระยา เเนวความคิดในการออกแบบที่นี่ เป็นการผสมผสานของเก่าที่เคยเป็นอาคารโกดังสินค้า ให้กลายมาเป็นแหล่งชอปปิ้งภายใต้สถาปัตยกรรมสมัย ร.5 ได้อย่างลงตัว',
        dateRange: {
          start: new Date('2018-05-14T00:00:00Z'),
          end: new Date('2018-06-27T00:00:00Z')
        },
        openingTime: this.timeService.convertToDate('15:00:00'),
        closingTime: this.timeService.convertToDate('15:00:00'),
        contactPersonFullname: 'กิจกร โอชาร',
        contactPersonPhoneNumber: '0819863257',
        contactPersonEmail: 'admin@ASIATIQUE.com',
        location: 'พระราม 3 กทม',
        locationLatLng: '13.737038, 100.598623',
        termsAndCondition: `1. ห้ามจำหน่ายเครื่องดื่มแอลกอฮอล์ในพื้นที่ก่อนได้รับอนุญาต หากพบเห็นจะขอยึดสินค้าไว้
และได้รับใบเตือน 1 ครั้ง

2. รองพื้นบูธด้วยไวนิล เพื่อป้องกันความเสียหาย เช่น คราบน้ำมันรอยไหม้เป็นต้น และต้องทา
การล้าง หรือขัดพื้น หลังจากทำการขายเสร็จสิ้นในวันสุดท้าย หากพื้นที่ในบูธสกปรก จะมี
ค่าปรับเพิ่ม 1,000 บาท

3. การทิ้งน้ำและขยะลงในถุงขยะก่อนนำไปทิ้งที่จุดโหลดขยะของศูนย์หากไม่นำไปทิ้งที่จุดตาม
กำหนดจะได้รับใบเตือน 1 ครั้ง
`,
        depositPaymentDue: new Date('2018-05-02T00:00:00'),
        fullPaymentDue: new Date('2018-05-05T00:00:00'),
        reservationDue: new Date('2018-04-28T00:00:00'),
        estimateVisitor: '65450',
        tags: 'Night, Day'
      });
      // tslint:enable:max-line-length
    }, 100);
  }
}

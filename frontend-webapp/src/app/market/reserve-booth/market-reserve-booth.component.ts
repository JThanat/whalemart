import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { MarketDetail } from '../market-detail-resolver.service';
import { MarketReserveBoothService } from './market-reserve-booth.service';

export interface Booth {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-market-reserve-booth',
  templateUrl: './market-reserve-booth.component.html',
  styleUrls: ['./market-reserve-booth.component.scss']
})
export class MarketReserveBoothComponent implements OnInit {
  marketDetailObservable: Observable<MarketDetail>;
  booths: Observable<Booth>;
  reserveForm: FormGroup;
  boothsForm: FormArray;

  constructor(
    private route: ActivatedRoute,
    private marketReserveBoothService: MarketReserveBoothService
  ) {}

  ngOnInit() {
    this.marketDetailObservable = this.route.data.pipe(map(data => data.marketDetail));
    this.booths = this.route.data.pipe(map(data => data.booths));

    this.boothsForm = new FormArray([], [this.marketReserveBoothService.boothsDuplicateValidator]);
    for (let i = 0; i < 10; i++) {
      this.boothsForm.push(new FormControl('', [Validators.required]));
    }

    this.reserveForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      booths: this.boothsForm
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { MarketDetail } from '../market-detail-resolver.service';

@Component({
  selector: 'app-market-reserve-booth',
  templateUrl: './market-reserve-booth.component.html',
  styleUrls: ['./market-reserve-booth.component.scss']
})
export class MarketReserveBoothComponent implements OnInit {
  marketDetailObservable: Observable<MarketDetail>;
  reserveForm: FormGroup;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.marketDetailObservable = this.route.data.pipe(map(data => data.marketDetail));
    this.reserveForm = new FormGroup({
      name: new FormControl('')
    });
  }
}

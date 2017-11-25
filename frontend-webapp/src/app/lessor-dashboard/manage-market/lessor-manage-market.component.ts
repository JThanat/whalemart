import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Market } from '../../core/market/market.service';

@Component({
  selector: 'app-lessor-manage-market',
  templateUrl: './lessor-manage-market.component.html',
  styleUrls: ['./lessor-manage-market.component.scss']
})
export class LessorManageMarketComponent implements OnInit {
  lessorMarkets$: Observable<Market[]>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.lessorMarkets$ = this.route.data.pipe(map(data => data.markets));
  }
}

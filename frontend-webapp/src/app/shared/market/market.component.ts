import { Component, Input } from '@angular/core';

import { Market } from '../../core/market/market.service';

@Component({
  selector: 'app-market-item',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent {
  @Input() market: Market;
}

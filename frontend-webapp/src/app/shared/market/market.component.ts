import { Component, Input } from '@angular/core';

import { Market } from '../../core/market/market.service';

@Component({
  selector: 'app-market-item',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent {
  @Input() market: Market = {
    imageURL: 'https://www.petful.com/wp-content/uploads/2013/04/160490011_b0cecf8fa1_z.jpg',
    expireDay: 3,
    name: 'ตลาดอิอิ',
    startDate: new Date(),
    endDate: new Date(),
    location: 'ถนนนิวยอร์ก',
    minPrice: 1200
  };
}

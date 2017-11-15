import { Component, Input } from '@angular/core';

export interface Market {
  expireDay: number;
  imageURL: string;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  price: number;
}

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
    price: 1200
  };
}

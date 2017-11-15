import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-market-item',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  @Input() expireDay: number;
  @Input() imageURL: string;
  @Input() marketName: string;
  @Input() location: string;
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() price: number;
}

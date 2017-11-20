import {
  animate,
  animateChild,
  group,
  query,
  stagger,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { MarketFeed } from '../core/market/market.service';
import { DateRangeService } from '../core/utils/date-range.service';

@Component({
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  animations: [
    trigger('pageIn', [
      transition(':enter', [
        group([
          query('@searchSectionIn', [animateChild()]),
          query('@feedSectionIn', [animateChild({ delay: 150 })])
        ])
      ])
    ]),
    trigger('searchSectionIn', [
      transition(':enter', [
        query('p, .col-12', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(50, [
            animate(
              '250ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' })
            )
          ])
        ])
      ])
    ]),
    trigger('feedSectionIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '500ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'none' })
        )
      ])
    ])
  ]
})
export class FeedComponent implements OnInit {
  @HostBinding('@pageIn') pageIn = true;
  coolCarouselLooper = [0, 1];
  marketFeed: Observable<MarketFeed>;
  searchForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dateRangeService: DateRangeService
  ) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl(''),
      dateRange: new FormControl(null)
    });

    this.marketFeed = this.route.data.pipe(map(data => data.marketFeed));
  }

  search() {
    const { searchQuery, dateRange } = this.searchForm.value;
    this.router.navigate(['/search'], {
      queryParams: {
        q: searchQuery,
        daterange: dateRange ? this.dateRangeService.serialize(dateRange) : undefined
      }
    });
  }
}

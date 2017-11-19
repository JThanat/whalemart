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

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl('')
    });

    this.marketFeed = this.route.data.pipe(map(data => data.marketFeed));
  }

  search() {
    this.router.navigate(['/search'], {
      queryParams: {
        q: this.searchForm.value.searchQuery
      }
    });
  }
}

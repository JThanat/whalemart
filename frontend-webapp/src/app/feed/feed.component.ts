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
import { FormGroup } from '@angular/forms';

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
  carouselLooper = [0, 1, 2, 3];
  coolCarouselLooper = [0, 1];
  searchForm: FormGroup;

  ngOnInit() {
    this.searchForm = new FormGroup({});
  }
}

import { Component } from '@angular/core';

@Component({
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  carouselLooper = [0, 1, 2, 3];
}

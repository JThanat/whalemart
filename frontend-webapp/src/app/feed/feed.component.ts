import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  carouselLooper = [0, 1, 2, 3];
  coolCarouselLooper = [0, 1];
  searchForm: FormGroup;

  ngOnInit() {
    this.searchForm = new FormGroup({});
  }
}

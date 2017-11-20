import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, first, map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { DateRangeService, DateRange } from '../utils/date-range.service';

@Component({
  selector: 'app-nav-bar-search-box',
  templateUrl: './nav-bar-search-box.component.html',
  styleUrls: ['./nav-bar-search-box.component.scss']
})
export class NavBarSearchBoxComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;

  private queryParamUpdater: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dateRangeService: DateRangeService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.pipe(first()).subscribe(queryParamMap => {
      const dateRange = this.dateRangeService.deserialize(queryParamMap.get('daterange') || '');
      this.searchForm = new FormGroup({
        query: new FormControl(queryParamMap.get('q') || ''),
        dateRange: new FormControl(dateRange)
      });
    });

    this.queryParamUpdater = this.searchForm.valueChanges.pipe(
      map(() => this.searchForm.value as { query: string, dateRange: DateRange | null }),
      distinctUntilChanged(),
      debounceTime(300)
    ).subscribe(value => {
      this.router.navigate(['/search'], {
        queryParams: {
          q: value.query,
          daterange: value.dateRange ? this.dateRangeService.serialize(value.dateRange) : undefined
        },
        queryParamsHandling: 'merge'
      });
    });
  }

  ngOnDestroy() {
    this.queryParamUpdater.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, first, map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.get('q') || ''),
      first()
    ).subscribe(q => {
      this.searchForm = new FormGroup({
        query: new FormControl(q)
      });
    });

    this.queryParamUpdater = this.searchForm.valueChanges.pipe(
      map(() => this.searchForm.value.query as string),
      distinctUntilChanged(),
      debounceTime(300)
    ).subscribe(queryString => {
      this.router.navigate(['/search'], {
        queryParams: {
          q: queryString
        },
        queryParamsHandling: 'merge'
      });
    });
  }

  ngOnDestroy() {
    this.queryParamUpdater.unsubscribe();
  }
}

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParamMap.pipe(first()).subscribe(queryParamMap => {
      const queryString = queryParamMap.get('q') || '';
      this.searchForm = new FormGroup({
        query: new FormControl(queryString)
      });
    });

    this.queryParamUpdater = this.searchForm.valueChanges
      .pipe(
        map(() => this.searchForm.value as { query: string }),
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe(value => {
        this.router.navigate(['/search'], {
          queryParams: { q: value.query }
        });
      });
  }

  ngOnDestroy() {
    this.queryParamUpdater.unsubscribe();
  }
}

import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';

import { BreadcrumbItemDirective } from './breadcrumb-item.directive';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements AfterContentInit {
  @ContentChildren(BreadcrumbItemDirective, { read: TemplateRef })
  breadcrumbItems: QueryList<TemplateRef<any>>;

  displayBreadcrumbItems: Observable<TemplateRef<any>[]>;

  ngAfterContentInit() {
    this.displayBreadcrumbItems = this.breadcrumbItems.changes.pipe(
      startWith({}),
      map(() => this.breadcrumbItems.toArray())
    );
  }
}

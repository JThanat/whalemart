import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BreadcrumbItemDirective } from './breadcrumb/breadcrumb-item.directive';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DateRangeInputDirective } from './date-range/date-range-input.directive';
import { DateRangePipe } from './date-range/date-range.pipe';
import { FileInputComponent } from './file-input/file-input.component';
import { InputErrorComponent } from './input/input-error.component';
import { InputGroupComponent } from './input/input-group.component';
import { InputDirective } from './input/input.directive';
import { MarketComponent } from './market/market.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SubNavBarDirective } from './sub-nav-bar/sub-nav-bar.directive';
import { SvgIconComponent } from './svg-icon/svg-icon.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    }),
    PortalModule
  ],
  declarations: [
    InputGroupComponent,
    InputDirective,
    InputErrorComponent,
    SvgIconComponent,
    PaginationComponent,
    SubNavBarDirective,
    MarketComponent,
    DateRangePipe,
    DateRangeInputDirective,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    FileInputComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputGroupComponent,
    InputDirective,
    InputErrorComponent,
    SvgIconComponent,
    PaginationComponent,
    PortalModule,
    SubNavBarDirective,
    MarketComponent,
    DateRangePipe,
    DateRangeInputDirective,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    FileInputComponent
  ],
  providers: [
    DatePipe,
    DateRangePipe,
    { provide: LOCALE_ID, useValue: 'th' }
  ]
})
export class SharedModule { }

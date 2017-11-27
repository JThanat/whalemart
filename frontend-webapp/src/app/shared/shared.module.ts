import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BreadcrumbItemDirective } from './breadcrumb/breadcrumb-item.directive';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DateRangePipe } from './date-range/date-range.pipe';
import { InputModule } from './input/input.module';
import { MarketComponent } from './market/market.component';
import { MenuItemComponent } from './menu/menu-item.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './not-found/not-found.component';
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
    PortalModule,
    OverlayModule,
    A11yModule,
    ScrollDispatchModule,
    InputModule
  ],
  declarations: [
    SvgIconComponent,
    PaginationComponent,
    SubNavBarDirective,
    MarketComponent,
    DateRangePipe,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    MenuComponent,
    MenuItemComponent,
    NotFoundComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    SvgIconComponent,
    PaginationComponent,
    PortalModule,
    OverlayModule,
    A11yModule,
    ScrollDispatchModule,
    SubNavBarDirective,
    MarketComponent,
    DateRangePipe,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    MenuComponent,
    MenuItemComponent,
    InputModule,
    NotFoundComponent
  ],
  providers: [DatePipe, DateRangePipe, { provide: LOCALE_ID, useValue: 'th' }]
})
export class SharedModule {}

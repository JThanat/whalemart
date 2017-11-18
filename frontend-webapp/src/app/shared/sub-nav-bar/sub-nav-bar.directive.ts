import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { SubNavBarService } from '../../core/nav-bar/sub-nav-bar.service';

@Directive({
  selector: '[appSubNavBar]'
})
export class SubNavBarDirective implements OnInit, OnDestroy {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private subNavBarService: SubNavBarService
  ) { }

  ngOnInit() {
    this.subNavBarService.attach(this.templateRef, this.viewContainerRef);
  }

  ngOnDestroy() {
    this.subNavBarService.detach();
  }
}

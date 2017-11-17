import { Portal, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SubNavBarService {
  private attachingSubNavBarPortal = new BehaviorSubject<Portal<any> | undefined>(undefined);

  attach(subNavBarTemplate: TemplateRef<any>, subNavBarViewContainerRef: ViewContainerRef) {
    if (this.attachingSubNavBarPortal.value) {
      throw new Error('Cannot attach more than one sub nav bar simultaneously');
    }

    const portal = new TemplatePortal(subNavBarTemplate, subNavBarViewContainerRef);
    this.attachingSubNavBarPortal.next(portal);
  }

  detach() {
    if (!this.attachingSubNavBarPortal.value) {
      throw new Error('No sub nav bar to detach');
    }

    this.attachingSubNavBarPortal.next(undefined);
  }

  getAttachingSubNavBarPortal() {
    return this.attachingSubNavBarPortal.asObservable();
  }
}

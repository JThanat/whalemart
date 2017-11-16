import { Injectable } from '@angular/core';
import { NavigationEnd, Router, UrlTree } from '@angular/router';

@Injectable()
export class SearchBackButtonService {
  private lastNonSearchRoute: UrlTree | undefined = undefined;

  constructor(private router: Router) {
    if (this.router.navigated) {
      this.checkRoute(router.url);
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.urlAfterRedirects);
      }
    });
  }

  private checkRoute(url: string) {
    const urlTree = this.router.parseUrl(url);

    if (!this.isInSearchPage(urlTree)) {
      this.lastNonSearchRoute = urlTree;
    }
  }

  private isInSearchPage(urlTree: UrlTree) {
    const segmentGroup = urlTree.root.children.primary;
    if (!segmentGroup) {
      return false;
    }

    const segments = segmentGroup.segments;
    if (segments.length > 0 && segments[0].path === 'search') {
      return true;
    }

    return false;
  }

  canGoBack() {
    return this.lastNonSearchRoute !== undefined;
  }

  goBack() {
    if (!this.lastNonSearchRoute) {
      throw new Error('Cannot go back: no previous route');
    }

    if (!this.isInSearchPage(this.router.parseUrl(this.router.url))) {
      throw new Error('Cannot go back: not currently in search page');
    }

    const route = this.lastNonSearchRoute;
    this.lastNonSearchRoute = undefined;
    return this.router.navigateByUrl(route);
  }
}

import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { Component } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchBackButtonService } from './search-back-button.service';

@Component({
  template: ''
})
class MockComponent { }

fdescribe('SearchBackButtonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', pathMatch: 'full', component: MockComponent },
          { path: 'search', component: MockComponent },
          { path: 'about', component: MockComponent }
        ])
      ],
      declarations: [MockComponent],
      providers: [SearchBackButtonService]
    });

    const location = TestBed.get(Location) as SpyLocation;
    location.setBaseHref('');
  });

  const inj = (fn: (uut: SearchBackButtonService, router: Router, location: SpyLocation) => void) =>
    fakeAsync(inject([SearchBackButtonService, Router, Location], fn));

  it('should initially can go back from home page', inj((uut, router, location) => {
    location.setInitialPath('/');
    router.initialNavigation();
    tick();
    expect(uut.canGoBack()).toBe(true);

    router.navigateByUrl('/search');
    tick();
    expect(uut.canGoBack()).toBe(true);

    uut.goBack();
    tick();
    expect(router.url).toBe('/');

    // It should be able to go back (to home page).
    expect(uut.canGoBack()).toBe(true);
  }));

  it('should not go back if the initial route is search page', inj((uut, router, location) => {
    location.setInitialPath('/search');
    router.initialNavigation();
    tick();
    expect(uut.canGoBack()).toBe(false);
  }));

  it('should go back to non search page', inj((uut, router, location) => {
    location.setInitialPath('/about?foo=foo');
    router.initialNavigation();
    tick();
    expect(uut.canGoBack()).toBe(true);

    router.navigateByUrl('/');
    tick();
    router.navigateByUrl('/about?bar=bar');
    tick();
    expect(uut.canGoBack()).toBe(true);

    router.navigateByUrl('search?q=123');
    tick();
    router.navigateByUrl('search?q=456');
    tick();
    expect(uut.canGoBack()).toBe(true);

    uut.goBack();
    tick();
    expect(router.url).toBe('/about?bar=bar');
  }));
});

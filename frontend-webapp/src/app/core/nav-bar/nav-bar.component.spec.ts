import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of as observableOf } from 'rxjs/observable/of';

import { AlertService } from '../alert/alert.service';
import { UserService, UserStatus, UserStatusType } from '../user/user.service';
import { NavBarComponent } from './nav-bar.component';
import { SubNavBarService } from './sub-nav-bar.service';

class MockUserService {
  userStatus = new BehaviorSubject<UserStatus>({ type: UserStatusType.Unknown });

  getUserStatus() {
    return this.userStatus;
  }
}

class MockSubNavBarService {
  getAttachingSubNavBarPortal() {
    return observableOf(undefined);
  }
}

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let userService: MockUserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavBarComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        {
          provide: AlertService,
          useFactory: () => jasmine.createSpyObj('MockAlertService', ['show'])
        },
        { provide: SubNavBarService, useClass: MockSubNavBarService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(inject([UserService], (mockUserService: MockUserService) => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    userService = mockUserService;
  }));

  afterEach(() => userService.userStatus.complete());

  it('should open and close navbar on clicking toggle button', () => {
    fixture.autoDetectChanges(true);

    const toggleBtnElem = fixture.debugElement.query(By.css('.hamburger'));
    const toggleBtn = toggleBtnElem.nativeElement as HTMLButtonElement;

    expect(fixture.debugElement.query(By.css('.menu-list')).classes.hidden).toBe(true);
    expect(component.isMenuOpened).toBe(false);

    toggleBtn.click();
    expect(fixture.debugElement.query(By.css('.menu-list')).classes.hidden).toBe(false);
    expect(component.isMenuOpened).toBe(true);

    toggleBtn.click();
    expect(fixture.debugElement.query(By.css('.menu-list')).classes.hidden).toBe(true);
    expect(component.isMenuOpened).toBe(false);
  });
});

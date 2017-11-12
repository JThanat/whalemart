import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserInfo, UserService } from '../user/user.service';
import { NavBarComponent } from './nav-bar.component';

class MockUserService {
  userInfo = new BehaviorSubject<UserInfo | undefined>(undefined);
}

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let userService: MockUserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavBarComponent],
      providers: [{ provide: UserService, useClass: MockUserService }]
    }).compileComponents();
  }));

  beforeEach(inject([UserService], (mockUserService: MockUserService) => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    userService = mockUserService;
  }));

  afterEach(() => userService.userInfo.complete());

  it('should have userName property set correctly', () => {
    // Set new userInfo into UserService before ngOnInit
    userService.userInfo = new BehaviorSubject<UserInfo | undefined>(undefined);
    fixture.detectChanges();

    let userName: string | undefined;
    component.userName.subscribe(un => { userName = un; });

    expect(userName).toBe(undefined);

    userService.userInfo.next({ email: 'test@abcde.com', token: 'TESTTOKEN' });
    expect(userName).toBe('test@abcde.com');
  });

  it('should open and close navbar on clicking toggle button', () => {
    fixture.autoDetectChanges(true);

    const toggleBtnElem = fixture.debugElement.query(By.css('.navbar-toggler'));
    const toggleBtn = toggleBtnElem.nativeElement as HTMLButtonElement;

    expect(fixture.debugElement.query(By.css('.navbar-collapse')).classes.show).toBe(false);
    expect(component.isMenuOpened).toBe(false);

    toggleBtn.click();
    expect(fixture.debugElement.query(By.css('.navbar-collapse')).classes.show).toBe(true);
    expect(component.isMenuOpened).toBe(true);

    toggleBtn.click();
    expect(fixture.debugElement.query(By.css('.navbar-collapse')).classes.show).toBe(false);
    expect(component.isMenuOpened).toBe(false);
  });
});

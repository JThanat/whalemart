import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService } from '../core/alert/alert.service';
import { UserService } from '../core/user/user.service';
import { IntercomponentDataService } from '../core/utils/intercomponent-data.service';
import { FacebookLoginService } from './facebook-login.service';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

class MockLoginService {
  login(username: string, password: string) { }
}

class MockFacebookLoginService {
  ensureFbScriptLoad() { }
}

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useClass: MockLoginService },
        { provide: FacebookLoginService, useClass: MockFacebookLoginService },
        UserService,
        IntercomponentDataService,
        {
          provide: AlertService,
          useFactory: () => jasmine.createSpyObj('MockAlertService', ['show', 'close'])
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
  });

  it('should ensure that FB script is loaded', inject(
    [FacebookLoginService],
    (facebookLoginService: FacebookLoginService) => {
      const fbScriptLoadSpy = spyOn(facebookLoginService, 'ensureFbScriptLoad');
      fixture.detectChanges();
      expect(fbScriptLoadSpy).toHaveBeenCalledTimes(1);
    }
  ));
});

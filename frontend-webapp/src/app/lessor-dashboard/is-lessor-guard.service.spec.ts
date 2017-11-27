import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { IsLessorGuardService } from './is-lessor-guard.service';

describe('IsLessorGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IsLessorGuardService]
    });
  });

  const inj = (fn: (uut: IsLessorGuardService, httpMock: HttpTestingController) => void) =>
    inject([IsLessorGuardService, HttpTestingController], fn);

  afterEach(
    inject([HttpTestingController], (httpMock: HttpTestingController) => httpMock.verify())
  );

  it(
    'should be able to activate if the user is the lessor',
    inj((uut, httpMock) => {
      let isOK = false;

      uut.canActivate().subscribe(canActivate => {
        expect(canActivate).toBe(true);
        isOK = true;
      });

      httpMock
        .expectOne({ url: '/api/lessor/', method: 'GET' })
        .flush({}, { status: 200, statusText: 'OK' });

      expect(isOK);
    })
  );

  it(
    'should not be able to activate if the user is not the lessor',
    inj((uut, httpMock) => {
      let isOK = false;

      uut.canActivate().subscribe(canActivate => {
        expect(canActivate).toBe(false);
        isOK = true;
      });

      httpMock
        .expectOne({ url: '/api/lessor/', method: 'GET' })
        .flush({}, { status: 403, statusText: 'Forbidden' });

      expect(isOK);
    })
  );

  it(
    'should throw an error if there is a server error',
    inj((uut, httpMock) => {
      let isError = false;

      uut.canActivate().subscribe(
        () => fail(),
        error => {
          if (error instanceof HttpErrorResponse) {
            expect(error.error).toEqual({ foo: 'bar' });
            isError = true;
          } else {
            fail();
          }
        }
      );

      httpMock
        .expectOne({ url: '/api/lessor/', method: 'GET' })
        .flush({ foo: 'bar' }, { status: 500, statusText: 'Internal Server Error' });

      expect(isError);
    })
  );
});

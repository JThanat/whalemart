import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { KeyValueStore, STORAGE_OBJ } from '../local-db/key-value-store.service';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        KeyValueStore,
        { provide: STORAGE_OBJ, useValue: sessionStorage }
      ]
    });
  });

  beforeEach(() => sessionStorage.clear());
  afterEach(() => sessionStorage.clear());

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});

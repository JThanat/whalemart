import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { UserProductService } from './user-product.service';

describe('UserProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserProductService]
    });
  });

  it(
    'should be created',
    inject([UserProductService], (service: UserProductService) => {
      expect(service).toBeTruthy();
    })
  );
});

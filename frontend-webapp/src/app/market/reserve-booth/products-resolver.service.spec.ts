import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { ProductsResolver } from './products-resolver.service';

describe('ProductsResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsResolver]
    });
  });

  it(
    'should be created',
    inject([ProductsResolver], (service: ProductsResolver) => {
      expect(service).toBeTruthy();
    })
  );
});

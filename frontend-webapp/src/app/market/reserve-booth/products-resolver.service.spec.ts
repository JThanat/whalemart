import { inject, TestBed } from '@angular/core/testing';

import { ProductsResolver } from './products-resolver.service';

describe('ProductsResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsResolver]
    });
  });

  it('should be created', inject([ProductsResolver], (service: ProductsResolver) => {
    expect(service).toBeTruthy();
  }));
});

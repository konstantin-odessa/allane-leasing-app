import { TestBed } from '@angular/core/testing';

import { ModelAndBrandApiService } from './model-and-brand-api.service';

describe('ModelAndBrandApiService', () => {
  let service: ModelAndBrandApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelAndBrandApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

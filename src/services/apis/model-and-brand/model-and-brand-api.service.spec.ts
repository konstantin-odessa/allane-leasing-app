import { TestBed } from '@angular/core/testing';

import { ModelAndBrandApiService } from './model-and-brand-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ModelAndBrandApiService', () => {
  let service: ModelAndBrandApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(ModelAndBrandApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CustomerApiService } from './customer-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('CustomerApiService', () => {
  let service: CustomerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(CustomerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

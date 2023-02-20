import { TestBed } from '@angular/core/testing';

import { ContractOverviewsApiService } from './contract-overviews-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ContractOverviewsApiService', () => {
  let service: ContractOverviewsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(ContractOverviewsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

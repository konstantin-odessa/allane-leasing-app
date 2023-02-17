import { TestBed } from '@angular/core/testing';

import { ContractOverviewsApiService } from './contract-overviews-api.service';

describe('LeasingApiService', () => {
  let service: ContractOverviewsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractOverviewsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

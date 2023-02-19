import { TestBed } from '@angular/core/testing';

import { ContractApiService } from './contract-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ContractsApiService', () => {
  let service: ContractApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(ContractApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

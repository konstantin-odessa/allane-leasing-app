import { TestBed } from '@angular/core/testing';

import { VehicleApiService } from './vehicle-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('VehiclesApiService', () => {
  let service: VehicleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(VehicleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

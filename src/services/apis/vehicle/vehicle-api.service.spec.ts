import { TestBed } from '@angular/core/testing';

import { VehicleApiService } from './vehicle-api.service';

describe('VehiclesApiService', () => {
  let service: VehicleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

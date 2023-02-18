import { TestBed } from '@angular/core/testing';

import { VehicleHelperService } from './vehicle-helper.service';

describe('VehicleHelperService', () => {
  let service: VehicleHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

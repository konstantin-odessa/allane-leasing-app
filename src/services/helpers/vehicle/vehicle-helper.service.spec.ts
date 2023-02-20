import { TestBed } from '@angular/core/testing';

import { VehicleHelperService } from './vehicle-helper.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VehicleHelperService', () => {
  let service: VehicleHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(VehicleHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

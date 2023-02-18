import { TestBed } from '@angular/core/testing';

import { VehicleFormService } from './vehicle-form.service';

describe('ContractFormService', () => {
  let service: VehicleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

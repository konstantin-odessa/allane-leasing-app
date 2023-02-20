import { convertToParamMap } from '@angular/router';

export class ActivatedRouteMock {
  snapshot = {
    paramMap: convertToParamMap({
      contractId: 1,
      customerId: 1,
      vehicleId: 1,
    }),
  };
}

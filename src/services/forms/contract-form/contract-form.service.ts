import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contract } from '../../../models';
import { CustomerFormService } from '../customer-form/customer-form.service';
import { VehicleFormService } from '../vehicle-form/vehicle-form.service';
import { nanValidator } from '../../../validators';

@Injectable({
  providedIn: 'root',
})
export class ContractFormService {
  private _contractFormGroup = new FormGroup({
    monthlyRate: new FormControl(NaN, {
      validators: [Validators.required, nanValidator()],
      nonNullable: true,
    }),

    vehicle: this.vehicleFormService.form,
    customer: this.customerFormService.form,
  });

  constructor(
    private customerFormService: CustomerFormService,
    private vehicleFormService: VehicleFormService
  ) {}

  get form() {
    return this._contractFormGroup;
  }

  patchValue(contract: Contract) {
    const { monthlyRate } = contract;

    this._contractFormGroup.patchValue({ monthlyRate });
  }
}

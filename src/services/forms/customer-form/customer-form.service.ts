import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class CustomerFormService {
  private _customerFormGroup = new FormGroup({
    firstName: new FormControl<Customer['firstName']>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    lastName: new FormControl<Customer['lastName']>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    birthDate: new FormControl<Customer['birthDate'] | null>(null, {
      validators: [Validators.required],
      nonNullable: false,
    }),
  });

  get form() {
    return this._customerFormGroup;
  }

  // patchValue(contract: Customer) {
  //   const { vehicle, customer, monthlyRate } = contract;
  //
  //   this._customerFormGroup.patchValue({ monthlyRate });
  //
  //   this._customerFormGroup.patchValue({
  //     vehicle: {
  //       brand: vehicle.brand,
  //       modelYear: vehicle.modelYear,
  //       model: vehicle.model,
  //       price: vehicle.price,
  //       vin: vehicle.vin,
  //     },
  //   });
  //
  //   this._customerFormGroup.patchValue({
  //     customer: {
  //       firstName: customer.firstName,
  //       lastName: customer.lastName,
  //       birthDate: new Date(customer.birthDate),
  //     },
  //   });
  // }
}

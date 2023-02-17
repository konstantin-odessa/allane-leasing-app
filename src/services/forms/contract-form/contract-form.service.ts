import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contract, Customer, Vehicle } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class ContractFormService {
  private _contractFormGroup = new FormGroup({
    vehicle: new FormGroup({
      brand: new FormControl<Vehicle['brand']>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      modelYear: new FormControl<Vehicle['modelYear']>(NaN, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      price: new FormControl<Vehicle['price']>(NaN, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      model: new FormControl<Vehicle['model']>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      vin: new FormControl<Vehicle['vin']>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    }),
    monthlyRate: new FormControl(NaN, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    customer: new FormGroup({
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
    }),
  });

  get form() {
    return this._contractFormGroup;
  }

  patchValue(contract: Contract) {
    const { vehicle, customer, monthlyRate } = contract;

    this._contractFormGroup.patchValue({ monthlyRate });

    this._contractFormGroup.patchValue({
      vehicle: {
        brand: vehicle.brand,
        modelYear: vehicle.modelYear,
        model: vehicle.model,
        price: vehicle.price,
        vin: vehicle.vin,
      },
    });

    this._contractFormGroup.patchValue({
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        birthDate: new Date(customer.birthDate),
      },
    });
  }
}

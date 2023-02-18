import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class VehicleFormService {
  private _vehicleFormGroup = new FormGroup({
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
    vin: new FormControl<Vehicle['vin']>(''),
  });

  get form() {
    return this._vehicleFormGroup;
  }
}

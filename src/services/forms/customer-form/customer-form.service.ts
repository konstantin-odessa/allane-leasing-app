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
}

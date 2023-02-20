import { ValidatorFn, AbstractControl } from '@angular/forms';

export function nanValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: unknown } | null => {
    const value = control.value;

    return isNaN(value) ? { NaN: true } : null;
  };
}

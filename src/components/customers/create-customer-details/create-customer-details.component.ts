import { Component, Input, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs';
import { Customer, CustomerDTO } from '../../../models';

import { Router } from '@angular/router';
import {
  CustomerApiService,
  ModelAndBrandApiService,
  CustomerFormService,
} from '../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_DURATION } from '../../../constants';

@Component({
  selector: 'app-create-customer-details',
  templateUrl: './create-customer-details.component.html',
  styleUrls: ['./create-customer-details.component.css'],
})
export class CreateCustomerDetailsComponent implements OnDestroy {
  @Input() isStandalone = true;
  isLoading = false;
  customerFormGroup: typeof CustomerFormService.prototype.form;
  requiredErrorMessage = 'Field should not be empty';

  constructor(
    private router: Router,
    private customerApiService: CustomerApiService,
    private modelsBrandsApiService: ModelAndBrandApiService,
    private customerFormService: CustomerFormService,
    private snackBarService: MatSnackBar
  ) {
    this.customerFormGroup = this.customerFormService.form;
  }

  ngOnDestroy() {
    this.customerFormGroup.reset();
  }

  createCustomer() {
    const newCustomer: CustomerDTO = Customer.mapToDTO(
      this.customerFormGroup.value as Customer
    );

    this.isLoading = true;

    this.customerApiService
      .createCustomer(newCustomer)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.snackBarService.open(
            'Customer was successfully created!',
            'Close',
            {
              duration: SNACK_BAR_DURATION,
              verticalPosition: 'top',
            }
          );

          this.router.navigate(['/customers']);
        },
        error: err => {
          this.snackBarService.open(err?.error?.error || err.message, 'Close', {
            duration: SNACK_BAR_DURATION,
            verticalPosition: 'top',
          });
        },
      });
  }
}

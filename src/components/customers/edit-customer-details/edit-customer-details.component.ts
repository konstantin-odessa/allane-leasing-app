import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  finalize,
  from,
  mergeAll,
  Observable,
  of,
  shareReplay,
  take,
} from 'rxjs';
import { Customer, CustomerDTO } from '../../../models';

import { ActivatedRoute } from '@angular/router';
import { CustomerApiService, ModelAndBrandApiService } from '../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_DURATION } from '../../../constants';
import { CustomerFormService } from '../../../services/forms/customer-form/customer-form.service';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { DeleteCustomerModalComponent } from '../delete-customer-modal/delete-customer-modal.component';

@Component({
  selector: 'app-edit-customer-details',
  templateUrl: './edit-customer-details.component.html',
  styleUrls: ['./edit-customer-details.component.css'],
})
export class EditCustomerDetailsComponent implements OnInit, OnDestroy {
  editMode = false;
  isLoading = false;
  customerFormGroup: typeof CustomerFormService.prototype.form;
  requiredErrorMessage = 'Field should not be empty';

  customer$!: Observable<Customer>;

  @Input() set canEdit(value: boolean) {
    if (value) {
      this.customer$.pipe(take(1)).subscribe({
        next: customer => this.editCustomer(customer),
      });
    } else {
      this.cancelCustomerEdit();
    }
  }
  @Input()
  isStandalone = true;
  @Input() customerId: Customer['id'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerApiService: CustomerApiService,
    private modelsBrandsApiService: ModelAndBrandApiService,
    private customerFormService: CustomerFormService,
    private snackBarService: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.customerFormGroup = this.customerFormService.form;
  }

  ngOnInit() {
    this.customerId ??= Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.isLoading = true;

    this.customer$ = from([
      of(this.customerFormGroup.value as Customer),
      this.customerApiService
        .getCustomer(this.customerId)
        .pipe(map(Customer.mapFromDTO)),
    ]).pipe(
      mergeAll(),
      finalize(() => (this.isLoading = false)),
      shareReplay(1)
    );
  }

  ngOnDestroy() {
    this.customerFormGroup.reset();
  }

  editCustomer(customer: Customer) {
    this.editMode = true;

    this.customerFormGroup.patchValue(customer);
  }
  deleteCustomer(customer: Customer) {
    this.dialog.open(DeleteCustomerModalComponent, { data: customer.id });
  }

  saveCustomer() {
    const updatedCustomer: CustomerDTO = Customer.mapToDTO(
      this.customerFormGroup.value as Customer
    );

    this.isLoading = true;

    this.customerApiService
      .updateCustomer(this.customerId, updatedCustomer)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.editMode = false;

          this.snackBarService.open(
            'Customer was successfully updated!',
            'Close',
            {
              duration: SNACK_BAR_DURATION,
              verticalPosition: 'top',
            }
          );
        },
        error: err => {
          this.snackBarService.open(err.message, 'Close', {
            duration: SNACK_BAR_DURATION,
            verticalPosition: 'top',
          });
        },
      });
  }

  cancelCustomerEdit() {
    this.editMode = false;
  }
}
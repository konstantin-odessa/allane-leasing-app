import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../../models';
import { CustomerApiService } from '../../../services';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_DURATION } from '../../../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-contract-modal',
  templateUrl: './delete-customer-modal.component.html',
  styleUrls: ['./delete-customer-modal.component.css'],
})
export class DeleteCustomerModalComponent {
  isLoading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public customerId: Customer['id'],
    private dialogRef: MatDialogRef<DeleteCustomerModalComponent>,
    private customerApiService: CustomerApiService,
    private snackBarService: MatSnackBar,
    private router: Router
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.isLoading = true;
    this.customerApiService
      .deleteCustomer(this.customerId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.snackBarService.open(
            'Customer was successfully deleted!',
            'Close',
            {
              duration: SNACK_BAR_DURATION,
              verticalPosition: 'top',
            }
          );

          this.router.navigate(['/contracts']);
        },
        error: err => {
          this.snackBarService.open(err.message, 'Close', {
            duration: SNACK_BAR_DURATION,
            verticalPosition: 'top',
          });
        },
      });

    this.dialogRef.close();
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contract } from '../../../models';
import { ContractApiService } from '../../../services';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_DURATION } from '../../../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-contract-modal',
  templateUrl: './delete-contract-modal.component.html',
  styleUrls: ['./delete-contract-modal.component.css'],
})
export class DeleteContractModalComponent {
  isLoading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public contractId: Contract['id'],
    private dialogRef: MatDialogRef<DeleteContractModalComponent>,
    private contractApiService: ContractApiService,
    private snackBarService: MatSnackBar,
    private router: Router
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.isLoading = true;
    this.contractApiService
      .deleteContract(this.contractId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.snackBarService.open(
            'Contract was successfully deleted!',
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

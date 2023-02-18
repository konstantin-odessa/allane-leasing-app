import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleApiService } from '../../../services';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_DURATION } from '../../../constants';
import { Router } from '@angular/router';
import { Vehicle } from '../../../models';

@Component({
  selector: 'app-delete-contract-modal',
  templateUrl: './delete-vehicle-modal.component.html',
  styleUrls: ['./delete-vehicle-modal.component.css'],
})
export class DeleteVehicleModalComponent {
  isLoading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public vehicleId: Vehicle['id'],
    private dialogRef: MatDialogRef<DeleteVehicleModalComponent>,
    private vehicleApiService: VehicleApiService,
    private snackBarService: MatSnackBar,
    private router: Router
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.isLoading = true;
    this.vehicleApiService
      .deleteVehicle(this.vehicleId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.snackBarService.open(
            'Vehicle was successfully deleted!',
            'Close',
            {
              duration: SNACK_BAR_DURATION,
              verticalPosition: 'top',
            }
          );

          this.router.navigate(['/vehicles']);
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

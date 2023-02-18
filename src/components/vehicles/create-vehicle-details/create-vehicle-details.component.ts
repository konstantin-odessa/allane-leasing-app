import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { finalize, Observable } from 'rxjs';

import { Router } from '@angular/router';
import {
  ModelAndBrandApiService,
  VehicleApiService,
  VehicleHelperService,
} from '../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_DURATION } from '../../../constants';
import { Brand, Vehicle, VehicleModel } from '../../../models';
import { VehicleFormService } from '../../../services/forms/vehicle-form/vehicle-form.service';

@Component({
  selector: 'app-create-vehicle-details',
  templateUrl: './create-vehicle-details.component.html',
  styleUrls: ['./create-vehicle-details.component.css'],
})
export class CreateVehicleDetailsComponent implements OnInit, OnDestroy {
  @Input() isStandalone = true;
  brands$!: Observable<Brand[]>;
  vehicleModels$!: Observable<VehicleModel[]>;

  isLoading = false;
  vehicleFormGroup: typeof VehicleFormService.prototype.form;
  requiredErrorMessage = 'Field should not be empty';
  brandsLoading$!: Observable<boolean>;

  modelsLoading$!: Observable<boolean>;

  constructor(
    private router: Router,
    private vehicleApiService: VehicleApiService,
    private modelsBrandsApiService: ModelAndBrandApiService,
    private vehicleFormService: VehicleFormService,
    private snackBarService: MatSnackBar,
    private vehicleHelperService: VehicleHelperService
  ) {
    this.vehicleFormGroup = this.vehicleFormService.form;
  }

  ngOnInit() {
    this.vehicleHelperService.initDataFetching();

    this.vehicleModels$ = this.vehicleHelperService.vehicleModels$;
    this.modelsLoading$ = this.vehicleHelperService.modelsLoading$;
    this.brands$ = this.vehicleHelperService.brands$;
    this.brandsLoading$ = this.vehicleHelperService.brandsLoading$;
  }

  ngOnDestroy() {
    this.vehicleHelperService.cleanup();
  }

  createVehicle() {
    const newVehicle: Vehicle = this.vehicleFormGroup.value as Vehicle;

    this.isLoading = true;

    this.vehicleApiService
      .createVehicle(newVehicle)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.snackBarService.open(
            'Vehicle was successfully created!',
            'Close',
            {
              duration: SNACK_BAR_DURATION,
              verticalPosition: 'top',
            }
          );

          this.router.navigate(['/vehicles']);
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

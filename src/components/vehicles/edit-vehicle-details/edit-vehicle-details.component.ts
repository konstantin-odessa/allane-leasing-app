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

import { ActivatedRoute } from '@angular/router';
import {
  ModelAndBrandApiService,
  VehicleApiService,
  VehicleHelperService,
} from '../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_DURATION } from '../../../constants';
import { MatDialog } from '@angular/material/dialog';
import { DeleteVehicleModalComponent } from '../delete-vehicle-modal/delete-vehicle-modal.component';
import { VehicleFormService } from '../../../services/forms/vehicle-form/vehicle-form.service';
import { Brand, Vehicle, VehicleDTO, VehicleModel } from '../../../models';

@Component({
  selector: 'app-edit-vehicle-details',
  templateUrl: './edit-vehicle-details.component.html',
  styleUrls: ['./edit-vehicle-details.component.css'],
})
export class EditVehicleDetailsComponent implements OnInit, OnDestroy {
  @Input() set canEdit(value: boolean) {
    if (value) {
      this.vehicle$.pipe(take(1)).subscribe({
        next: vehicle => this.editVehicle(vehicle),
      });
    } else {
      this.cancelVehicleEdit();
    }
  }
  @Input()
  isStandalone = true;
  editMode = false;
  @Input() vehicleId: Vehicle['id'];
  isLoading = false;
  vehicleFormGroup: typeof VehicleFormService.prototype.form;
  requiredErrorMessage = 'Field should not be empty';
  brands$!: Observable<Brand[]>;
  vehicleModels$!: Observable<VehicleModel[]>;
  vehicle$!: Observable<Vehicle>;

  brandsLoading$!: Observable<boolean>;

  modelsLoading$!: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vehicleApiService: VehicleApiService,
    private modelsBrandsApiService: ModelAndBrandApiService,
    private vehicleFormService: VehicleFormService,
    private snackBarService: MatSnackBar,
    private dialog: MatDialog,
    private vehicleHelperService: VehicleHelperService
  ) {
    this.vehicleFormGroup = this.vehicleFormService.form;
  }

  ngOnInit() {
    this.vehicleId ??= Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.isLoading = true;

    this.vehicle$ = from([
      of(this.vehicleFormGroup.value as Vehicle),
      this.vehicleApiService.getVehicle(this.vehicleId),
    ]).pipe(
      mergeAll(),
      finalize(() => (this.isLoading = false)),
      shareReplay(1)
    );

    this.vehicleHelperService.initDataFetching();

    this.vehicleModels$ = this.vehicleHelperService.vehicleModels$;
    this.modelsLoading$ = this.vehicleHelperService.modelsLoading$;
    this.brands$ = this.vehicleHelperService.brands$;
    this.brandsLoading$ = this.vehicleHelperService.brandsLoading$;
  }

  ngOnDestroy() {
    this.vehicleHelperService.cleanup();
  }

  editVehicle(vehicle: Vehicle) {
    this.editMode = true;

    this.vehicleFormGroup.patchValue(vehicle);
  }
  deleteVehicle(customer: Vehicle) {
    this.dialog.open(DeleteVehicleModalComponent, { data: customer.id });
  }

  saveVehicle() {
    const updatedVehicle: VehicleDTO = this.vehicleFormGroup.value as Vehicle;

    this.isLoading = true;

    this.vehicleApiService
      .updateVehicle(this.vehicleId, updatedVehicle)
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

  cancelVehicleEdit() {
    this.editMode = false;
  }
}

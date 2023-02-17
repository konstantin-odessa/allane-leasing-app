import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand, ContractDTO, Customer, VehicleModel } from '../../models';
import { ContractApiService, ModelAndBrandApiService } from '../../services';
import {
  finalize,
  Observable,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ContractFormService } from '../../services/forms/contract-form/contract-form.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DATE_FORMATS, SNACK_BAR_DURATION } from '../../constants';

@Component({
  selector: 'app-contract-details',
  templateUrl: './create-contract-details.component.html',
  styleUrls: ['./create-contract-details.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }],
})
export class CreateContractDetailsComponent implements OnInit, OnDestroy {
  isLoading = false;
  brands$!: Observable<Brand[]>;
  vehicleModels$!: Observable<VehicleModel[]>;
  unsubscribe$ = new Subject<void>();
  contractFormGroup: typeof ContractFormService.prototype.form;
  requiredErrorMessage = 'Field should not be empty';

  constructor(
    private router: Router,
    private contractsApiService: ContractApiService,
    private modelsBrandsApiService: ModelAndBrandApiService,
    private contractFormService: ContractFormService,
    private snackBarService: MatSnackBar
  ) {
    this.contractFormGroup = this.contractFormService.form;
  }

  ngOnInit() {
    this.brands$ = this.modelsBrandsApiService.getBrands().pipe(shareReplay(1));

    this._toggleVehicleModelControl();
    this._getVehicleModelsOnBrandChange();
    this._clearVehicleModelOnBrandChange();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private _toggleVehicleModelControl() {
    this.contractFormGroup.controls.vehicle.controls.model.disable();

    this.contractFormGroup.controls.vehicle.controls.brand.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(brand => {
        if (brand) {
          this.contractFormGroup.controls.vehicle.controls.model.enable();
        }
      });
  }

  private _getVehicleModelsOnBrandChange() {
    this.vehicleModels$ =
      this.contractFormGroup.controls.vehicle.controls.brand.valueChanges.pipe(
        switchMap(brandName =>
          this.brands$.pipe(
            map(brands => brands.find(brand => brand.name === brandName))
          )
        ),
        switchMap(selectedBrand =>
          this.modelsBrandsApiService.getModelsByBrandId(selectedBrand?.id)
        ),
        shareReplay(1)
      );
  }

  private _clearVehicleModelOnBrandChange() {
    this.vehicleModels$.pipe(takeUntil(this.unsubscribe$)).subscribe(models => {
      const vehicleModel = this.contractFormGroup.value.vehicle?.model;

      if (models.every(model => model.name !== vehicleModel)) {
        this.contractFormGroup.controls.vehicle.controls.model.setValue('');
      }
    });
  }

  createContract() {
    const newContract: ContractDTO = {
      ...this.contractFormGroup.value,
      customer: Customer.mapToDTO(
        this.contractFormGroup.value.customer as Customer
      ),
    } as ContractDTO;

    this.isLoading = true;

    this.contractsApiService
      .createContract(newContract)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.snackBarService.open(
            'Contract was successfully created!',
            'Close',
            {
              duration: SNACK_BAR_DURATION,
              verticalPosition: 'top',
            }
          );

          this.router.navigate(['/contracts']);
        },
        error: err => {
          this.snackBarService.open(err.error.error, 'Close', {
            duration: SNACK_BAR_DURATION,
            verticalPosition: 'top',
          });
        },
      });
  }
}

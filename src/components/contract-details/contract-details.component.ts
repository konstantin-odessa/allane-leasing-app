import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Brand,
  Contract,
  ContractDTO,
  Customer,
  VehicleModel,
} from '../../models';
import { ContractApiService, ModelAndBrandApiService } from '../../services';
import {
  delay,
  finalize,
  from,
  mergeAll,
  Observable,
  of,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ContractFormService } from '../../services/forms/contract-form/contract-form.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteContractModalComponent } from '../delete-contract-modal/delete-contract-modal.component';
import { DATE_FORMATS, SNACK_BAR_DURATION } from '../../constants';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }],
})
export class ContractDetailsComponent implements OnInit, OnDestroy {
  isLoading = false;
  editMode = false;
  contract$!: Observable<Contract>;
  contractId: Contract['id'];
  brands$!: Observable<Brand[]>;
  vehicleModels$!: Observable<VehicleModel[]>;
  unsubscribe$ = new Subject<void>();
  contractFormGroup: typeof ContractFormService.prototype.form;
  requiredErrorMessage = 'Field should not be empty';

  constructor(
    private activatedRoute: ActivatedRoute,
    private contractsApiService: ContractApiService,
    private modelsBrandsApiService: ModelAndBrandApiService,
    private contractFormService: ContractFormService,
    private snackBarService: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.contractFormGroup = this.contractFormService.form;
  }
  ngOnInit() {
    this.contractId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.isLoading = true;

    this.contract$ = from([
      of(this.contractFormGroup.value as Contract),
      this.contractsApiService.getContract(this.contractId),
    ]).pipe(
      mergeAll(),
      finalize(() => (this.isLoading = false))
    );

    this.brands$ = this.modelsBrandsApiService.getBrands().pipe(shareReplay(1));

    this._getVehicleModelsOnBrandChange();
    this._clearVehicleModelOnBrandChange();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  editContract(contract: Contract) {
    this.editMode = !this.editMode;

    this.contractFormService.patchValue(contract);
  }
  deleteContract(contract: Contract) {
    this.dialog.open(DeleteContractModalComponent, { data: contract.id });
  }

  saveContract() {
    const updatedContract: ContractDTO = {
      ...this.contractFormGroup.value,
      customer: Customer.mapToDTO(
        this.contractFormGroup.value.customer as Customer
      ),
    } as ContractDTO;

    this.isLoading = true;

    this.contractsApiService
      .updateContract(this.contractId, updatedContract)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: () => {
          this.editMode = !this.editMode;

          this.snackBarService.open(
            'Contract was successfully updated!',
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

  cancelContractEdit() {
    this.editMode = !this.editMode;
  }
}

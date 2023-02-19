import { Injectable } from '@angular/core';
import {
  from,
  mergeAll,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ModelAndBrandApiService, VehicleApiService } from '../../apis';
import { VehicleFormService } from '../../forms';
import { Brand, Vehicle, VehicleModel } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class VehicleHelperService {
  private _unsubscribeSubj$ = new Subject<void>();
  brands$!: Observable<Brand[]>;
  vehicleModels$!: Observable<VehicleModel[]>;
  vehicleFormGroup: typeof VehicleFormService.prototype.form;
  brandsLoading$!: Observable<boolean>;
  modelsLoading$!: Observable<boolean>;

  formBrand$!: Observable<Vehicle['brand']>;

  constructor(
    private vehicleApiService: VehicleApiService,
    private vehicleFormService: VehicleFormService,
    private modelsBrandsApiService: ModelAndBrandApiService
  ) {
    this.vehicleFormGroup = this.vehicleFormService.form;
  }
  private _toggleVehicleModelControl() {
    this.vehicleFormGroup.controls.model.disable();

    this.formBrand$.pipe(takeUntil(this._unsubscribeSubj$)).subscribe(brand => {
      if (brand) {
        this.vehicleFormGroup.controls.model.enable();
      }
    });
  }

  private _getVehicleModelsOnBrandChange() {
    this.vehicleModels$ = this.formBrand$.pipe(
      switchMap(brandName =>
        this.brands$.pipe(
          map(brands => brands.find(brand => brand.name === brandName))
        )
      ),
      filter(brand => !!brand),
      switchMap(selectedBrand =>
        this.modelsBrandsApiService.getModelsByBrandId(selectedBrand?.id)
      ),
      shareReplay(1)
    );

    this.modelsLoading$ = from([this.formBrand$, this.vehicleModels$]).pipe(
      mergeAll(),
      map(data => typeof data === 'string')
    );
  }

  private _clearVehicleModelOnBrandChange() {
    this.vehicleModels$
      .pipe(takeUntil(this._unsubscribeSubj$))
      .subscribe(models => {
        const vehicleModel = this.vehicleFormGroup.value.model;

        if (models.every(model => model.name !== vehicleModel)) {
          this.vehicleFormGroup.controls.model.setValue('');
        }
      });
  }

  initDataFetching() {
    this.formBrand$ = this.vehicleFormGroup.controls.brand.valueChanges.pipe(
      shareReplay(1)
    );

    this.brands$ = this.modelsBrandsApiService.getBrands().pipe(shareReplay(1));

    this.brandsLoading$ = this.brands$.pipe(
      startWith(false),
      map(data => {
        return !data;
      }),
      tap(isLoading => {
        if (isLoading) {
          this.vehicleFormGroup.controls.brand.disable({ emitEvent: false });
        } else {
          this.vehicleFormGroup.controls.brand.enable({ emitEvent: false });
        }
      })
    );

    this._toggleVehicleModelControl();
    this._getVehicleModelsOnBrandChange();
    this._clearVehicleModelOnBrandChange();
  }

  cleanup() {
    this._unsubscribeSubj$.next();
    this._unsubscribeSubj$.complete();

    this.vehicleFormGroup.reset();
  }
}

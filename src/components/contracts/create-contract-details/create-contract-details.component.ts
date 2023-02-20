import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ContractDTO, Customer, Vehicle } from '../../../models';
import {
  ContractApiService,
  CustomerApiService,
  VehicleApiService,
} from '../../../services';
import { finalize, Observable } from 'rxjs';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ContractFormService } from '../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DATE_FORMATS, SNACK_BAR_DURATION } from '../../../constants';
import { SortDirectionEnum } from '../../../enums';
import { map } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';

const MAX_PAGE_SIZE = 1000;

@Component({
  selector: 'app-contract-details',
  templateUrl: './create-contract-details.component.html',
  styleUrls: ['./create-contract-details.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }],
})
export class CreateContractDetailsComponent implements OnDestroy {
  isLoading = false;
  contractFormGroup: typeof ContractFormService.prototype.form;

  vehicles$!: Observable<Vehicle[]>;
  customers$!: Observable<Customer[]>;

  selectedVehicleId: Vehicle['id'];
  selectedCustomerId: Customer['id'];

  constructor(
    private router: Router,
    private contractsApiService: ContractApiService,
    private customersApiService: CustomerApiService,
    private vehicleApiService: VehicleApiService,
    private contractFormService: ContractFormService,
    private snackBarService: MatSnackBar
  ) {
    this.contractFormGroup = this.contractFormService.form;
    this.customers$ = customersApiService
      .getCustomers({
        page: 0,
        size: MAX_PAGE_SIZE,
        sort: SortDirectionEnum.UNSORTED,
      })
      .pipe(map(({ overviewItems }) => overviewItems.map(Customer.mapFromDTO)));

    this.vehicles$ = vehicleApiService
      .getVehicles({
        page: 0,
        size: MAX_PAGE_SIZE,
        sort: SortDirectionEnum.UNSORTED,
      })
      .pipe(map(({ overviewItems }) => overviewItems));
  }

  ngOnDestroy() {
    this.contractFormGroup.reset();
  }

  createContract() {
    const newContract: ContractDTO = {
      ...this.contractFormGroup.value,
      vehicle: {
        id: this.selectedVehicleId,
        ...this.contractFormGroup.value.vehicle,
      },
      customer: Customer.mapToDTO({
        id: this.selectedCustomerId,
        ...this.contractFormGroup.value.customer,
      } as Customer),
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
      });
  }

  changeVehicle({ value }: MatSelectChange) {
    this.selectedVehicleId = value;
  }

  changeCustomer({ value }: MatSelectChange) {
    this.selectedCustomerId = value;
  }

  onCustomerLoaded(customer: Customer) {
    this.contractFormGroup.patchValue({
      customer,
    });
  }

  onVehicleLoaded(vehicle: Vehicle) {
    this.contractFormGroup.patchValue({
      vehicle,
    });
  }
}

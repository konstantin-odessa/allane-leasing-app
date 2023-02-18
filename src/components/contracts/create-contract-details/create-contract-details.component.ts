import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand, ContractDTO, Customer, VehicleModel } from '../../../models';
import { ContractApiService, ModelAndBrandApiService } from '../../../services';
import {
  finalize,
  Observable,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ContractFormService } from '../../../services/forms/contract-form/contract-form.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DATE_FORMATS, SNACK_BAR_DURATION } from '../../../constants';

@Component({
  selector: 'app-contract-details',
  templateUrl: './create-contract-details.component.html',
  styleUrls: ['./create-contract-details.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }],
})
export class CreateContractDetailsComponent implements OnInit, OnDestroy {
  isLoading = false;
  contractFormGroup: typeof ContractFormService.prototype.form;
  requiredErrorMessage = 'Field should not be empty';

  constructor(
    private router: Router,
    private contractsApiService: ContractApiService,
    private contractFormService: ContractFormService,
    private snackBarService: MatSnackBar
  ) {
    this.contractFormGroup = this.contractFormService.form;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.contractFormGroup.reset();
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

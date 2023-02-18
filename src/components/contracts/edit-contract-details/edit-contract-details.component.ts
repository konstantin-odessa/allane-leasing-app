import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contract, ContractDTO, Customer } from '../../../models';
import { ContractApiService } from '../../../services';
import { finalize, from, mergeAll, Observable, of } from 'rxjs';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ContractFormService } from '../../../services/forms/contract-form/contract-form.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteContractModalComponent } from '../delete-contract-modal/delete-contract-modal.component';
import { DATE_FORMATS, SNACK_BAR_DURATION } from '../../../constants';

@Component({
  selector: 'app-contract-details',
  templateUrl: './edit-contract-details.component.html',
  styleUrls: ['./edit-contract-details.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }],
})
export class EditContractDetailsComponent implements OnInit, OnDestroy {
  isLoading = false;
  editMode = false;
  contract$!: Observable<Contract>;
  contractId: Contract['id'];
  contractFormGroup: typeof ContractFormService.prototype.form;
  requiredErrorMessage = 'Field should not be empty';

  constructor(
    private activatedRoute: ActivatedRoute,
    private contractsApiService: ContractApiService,
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
  }

  ngOnDestroy() {
    this.contractFormGroup.reset();
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

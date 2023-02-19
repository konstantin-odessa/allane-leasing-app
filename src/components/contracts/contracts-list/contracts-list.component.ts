import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  merge,
  Observable,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import {
  ContractOverviewDTO,
  ContractOverviewPageResponseDTO,
} from '../../../models';
import { ContractOverviewsApiService } from '../../../services';
import { SortDirectionEnum } from '../../../enums';
import { map } from 'rxjs/operators';
import { assertNever, getSortDirection } from '../../../helpers';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.css'],
})
export class ContractsListComponent implements AfterViewInit {
  isLoading = true;
  displayedColumns = [
    'contractNumber',
    'customerName',
    'vehicleName',
    'vin',
    'monthlyRate',
    'price',
    'details',
  ];

  dataSource$!: Observable<ContractOverviewPageResponseDTO>;
  contracts$!: Observable<ContractOverviewDTO[]>;
  numberOfItems$!: Observable<ContractOverviewPageResponseDTO['numberOfItems']>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private contractOverviewsApiService: ContractOverviewsApiService
  ) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.dataSource$ = merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      tap(() => {
        this.isLoading = true;
      }),
      switchMap(() =>
        this.contractOverviewsApiService
          .getContractOverviews({
            page: this.paginator.pageIndex,
            size: this.paginator.pageSize,
            sort: getSortDirection(this.sort.direction),
          })
          .pipe(
            tap(() => {
              this.isLoading = false;
            })
          )
      ),
      shareReplay(1)
    );

    this.numberOfItems$ = this.dataSource$.pipe(
      map(({ numberOfItems }) => numberOfItems)
    );
    this.contracts$ = this.dataSource$.pipe(
      map(({ overviewItems }) => overviewItems)
    );
  }
}

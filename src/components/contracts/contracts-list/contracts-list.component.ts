import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  merge,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import {
  ContractOverviewDTO,
  ContractOverviewPageResponseDTO,
  Customer,
} from '../../../models';
import { ContractOverviewsApiService } from '../../../services';
import { DataSortingEnum } from '../../../enums';
import { map } from 'rxjs/operators';

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
            sort: this._getSortDirection(),
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

  private _getSortDirection() {
    let sortDirection: DataSortingEnum;

    switch (this.sort.direction) {
      case '':
        sortDirection = DataSortingEnum.UNSORTED;
        break;
      case 'asc':
        sortDirection = DataSortingEnum.ASC;
        break;

      case 'desc':
        sortDirection = DataSortingEnum.DESC;
        break;
      default:
        throw new Error('should not happen');
    }

    return sortDirection;
  }
}

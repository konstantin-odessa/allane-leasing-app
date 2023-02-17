import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, of, shareReplay } from 'rxjs';
import {
  ContractOverviewDTO,
  ContractOverviewPageResponseDTO,
} from '../../models';
import { ContractOverviewsApiService } from '../../services';
import { DataSortingEnum } from '../../enums';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.css'],
})
export class ContractsListComponent implements OnInit, AfterViewInit {
  isLoadingResults = true;
  displayedColumns: string[] = [
    'contractNumber',
    'customerName',
    'vehicleName',
    'vin',
    'monthlyRate',
    'price',
    'details',
  ];

  dataSource$!: Observable<ContractOverviewPageResponseDTO>;
  contracts$: Observable<ContractOverviewDTO[]> = of([]);
  page$!: Observable<ContractOverviewPageResponseDTO['page']>;
  size$!: Observable<ContractOverviewPageResponseDTO['size']>;
  numberOfItems$!: Observable<ContractOverviewPageResponseDTO['numberOfItems']>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ContractOverviewsApiService) {}

  ngOnInit() {
    this.dataSource$ = this.apiService
      .getContractOverviews({
        page: 0,
        size: 10,
        sort: DataSortingEnum.UNSORTED,
      })
      .pipe(
        map(data => {
          this.isLoadingResults = !this.isLoadingResults;

          return data;
        }),
        shareReplay(1)
      );

    this.page$ = this.dataSource$.pipe(map(({ page }) => page));
    this.size$ = this.dataSource$.pipe(map(({ size }) => size));
    this.numberOfItems$ = this.dataSource$.pipe(
      map(({ numberOfItems }) => numberOfItems)
    );
    this.contracts$ = this.dataSource$.pipe(
      map(({ overviewItems }) => overviewItems)
    );
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
}

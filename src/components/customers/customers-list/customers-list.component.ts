import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  merge,
  Observable,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerApiService } from '../../../services';
import { DataSortingEnum } from '../../../enums';
import { map } from 'rxjs/operators';
import { Customer, CustomerPageResponseDTO } from '../../../models';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements AfterViewInit {
  isLoading = true;
  displayedColumns = ['id', 'firstName', 'lastName', 'birthDate', 'details'];
  dataSource$!: Observable<CustomerPageResponseDTO>;
  customers$!: Observable<Customer[]>;
  numberOfItems$!: Observable<CustomerPageResponseDTO['numberOfItems']>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private customerApiService: CustomerApiService) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.dataSource$ = merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      tap(() => {
        this.isLoading = true;
      }),
      switchMap(() =>
        this.customerApiService
          .getCustomers({
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
    this.customers$ = this.dataSource$.pipe(
      map(({ overviewItems }) => overviewItems.map(Customer.mapFromDTO))
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

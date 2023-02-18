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
import { VehicleApiService } from '../../../services';
import { DataSortingEnum } from '../../../enums';
import { map } from 'rxjs/operators';
import { Vehicle, VehiclePageResponseDTO } from '../../../models';

@Component({
  selector: 'app-customers-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css'],
})
export class VehiclesListComponent implements AfterViewInit {
  isLoading = true;
  displayedColumns = [
    'id',
    'brand',
    'model',
    'vin',
    'modelYear',
    'price',
    'details',
  ];
  dataSource$!: Observable<VehiclePageResponseDTO>;
  vehicles$!: Observable<Vehicle[]>;
  numberOfItems$!: Observable<VehiclePageResponseDTO['numberOfItems']>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private vehicleApiService: VehicleApiService) {}

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.dataSource$ = merge(this.sort.sortChange, this.paginator.page).pipe(
      startWith({}),
      tap(() => {
        this.isLoading = true;
      }),
      switchMap(() =>
        this.vehicleApiService
          .getVehicles({
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
    this.vehicles$ = this.dataSource$.pipe(
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

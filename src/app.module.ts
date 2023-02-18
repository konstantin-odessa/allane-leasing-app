import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import {
  ContractsListComponent,
  CreateContractDetailsComponent,
  DeleteContractModalComponent,
  EditContractDetailsComponent,
} from './components/contracts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CapEmptyDataPipe } from './pipes/cap-empty-data/cap-empty-data.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  CreateCustomerDetailsComponent,
  CustomersListComponent,
  DeleteCustomerModalComponent,
  EditCustomerDetailsComponent,
} from './components/customers';
import { MatDialogModule } from '@angular/material/dialog';
import { DelayInterceptor } from './interceptors/delay.interceptor';
import {
  CreateVehicleDetailsComponent,
  DeleteVehicleModalComponent,
  EditVehicleDetailsComponent,
  VehiclesListComponent,
} from './components/vehicles';

@NgModule({
  declarations: [
    AppComponent,
    ContractsListComponent,
    NavigationMenuComponent,
    EditContractDetailsComponent,
    CapEmptyDataPipe,
    DeleteContractModalComponent,
    CreateContractDetailsComponent,
    CustomersListComponent,
    CreateCustomerDetailsComponent,
    EditCustomerDetailsComponent,
    DeleteCustomerModalComponent,
    CreateVehicleDetailsComponent,
    EditVehicleDetailsComponent,
    VehiclesListComponent,
    DeleteVehicleModalComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    AppRoutingModule,
    MatTabsModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: DelayInterceptor },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  ContractsListComponent,
  CreateContractDetailsComponent,
  DeleteContractModalComponent,
  EditContractDetailsComponent,
  CreateCustomerDetailsComponent,
  CustomersListComponent,
  DeleteCustomerModalComponent,
  EditCustomerDetailsComponent,
  CreateVehicleDetailsComponent,
  DeleteVehicleModalComponent,
  EditVehicleDetailsComponent,
  VehiclesListComponent,
  AppComponent,
  NavigationMenuComponent,
} from './components';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
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
import { CapEmptyDataPipe, VehicleOutputPipe } from './pipes';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { DelayInterceptor } from './interceptors';

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
    VehicleOutputPipe,
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
    MatExpansionModule,
    MatStepperModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: DelayInterceptor },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

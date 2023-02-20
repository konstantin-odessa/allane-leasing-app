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
} from '../components';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CapEmptyDataPipe, VehicleOutputPipe } from '../pipes';
import { DelayInterceptor } from '../interceptors';
import { SharedMaterialModule } from './shared-material.module';
import { ErrorNotifierInterceptor } from '../interceptors/error-notifier/error-notifier.interceptor';

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
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedMaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: DelayInterceptor },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: ErrorNotifierInterceptor,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CreateVehicleDetailsComponent,
  EditVehicleDetailsComponent,
  VehiclesListComponent,
  ContractsListComponent,
  CreateContractDetailsComponent,
  EditContractDetailsComponent,
  CreateCustomerDetailsComponent,
  CustomersListComponent,
  EditCustomerDetailsComponent,
} from '../components';

const routes: Routes = [
  {
    path: 'contracts',
    children: [
      {
        path: '',
        component: ContractsListComponent,
      },
      {
        path: 'new',
        component: CreateContractDetailsComponent,
      },
      {
        path: ':contractId',
        component: EditContractDetailsComponent,
      },
    ],
  },
  {
    path: 'customers',
    children: [
      {
        path: '',
        component: CustomersListComponent,
      },
      {
        path: 'new',
        component: CreateCustomerDetailsComponent,
      },
      {
        path: ':customerId',
        component: EditCustomerDetailsComponent,
      },
    ],
  },
  {
    path: 'vehicles',
    children: [
      {
        path: '',
        component: VehiclesListComponent,
      },
      {
        path: 'new',
        component: CreateVehicleDetailsComponent,
      },
      {
        path: ':vehicleId',
        component: EditVehicleDetailsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'contracts',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

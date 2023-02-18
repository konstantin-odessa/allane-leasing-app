import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsListComponent } from './components/contracts/contracts-list/contracts-list.component';
import { EditContractDetailsComponent } from './components/contracts/edit-contract-details/edit-contract-details.component';
import { CreateContractDetailsComponent } from './components/contracts/create-contract-details/create-contract-details.component';
import { CustomersListComponent } from './components/customers/customers-list/customers-list.component';
import { CreateCustomerDetailsComponent } from './components/customers/create-customer-details/create-customer-details.component';
import { EditCustomerDetailsComponent } from './components/customers/edit-customer-details/edit-customer-details.component';
import {
  CreateVehicleDetailsComponent,
  EditVehicleDetailsComponent,
  VehiclesListComponent,
} from './components/vehicles';

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
        path: ':id',
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
        path: ':id',
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
        path: ':id',
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsListComponent } from './components/contracts-list/contracts-list.component';
import { EditContractDetailsComponent } from './components/edit-contract-details/edit-contract-details.component';
import { CreateContractDetailsComponent } from './components/create-contract-details/create-contract-details.component';

const routes: Routes = [
  {
    path: 'contracts',
    component: ContractsListComponent,
  },
  {
    path: 'contracts/new',
    component: CreateContractDetailsComponent,
  },
  {
    path: 'contracts/:id',
    component: EditContractDetailsComponent,
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

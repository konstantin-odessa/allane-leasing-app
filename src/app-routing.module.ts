import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsListComponent } from './components/contracts-list/contracts-list.component';
import { ContractDetailsComponent } from './components/contract-details/contract-details.component';

const routes: Routes = [
  {
    path: 'contracts',
    component: ContractsListComponent,
  },
  {
    path: 'contracts/:id',
    component: ContractDetailsComponent,
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

import { VehicleDTO } from './vehicle.model';
import { Customer, CustomerDTO } from './customer.model';

export type ContractDTO = {
  id?: number;
  monthlyRate: number;
  vehicle: VehicleDTO;
  customer: CustomerDTO;
};

export type Contract = Omit<ContractDTO, 'customer'> & {
  customer: Customer;
};

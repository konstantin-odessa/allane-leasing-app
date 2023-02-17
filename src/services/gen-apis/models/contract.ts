/* tslint:disable */
/* eslint-disable */
import { Customer } from './customer';
import { Vehicle } from './vehicle';
export interface Contract {
  customer: Customer;
  id?: number;
  monthlyRate: number;
  vehicle: Vehicle;
}

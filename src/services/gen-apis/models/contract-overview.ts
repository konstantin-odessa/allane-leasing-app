/* tslint:disable */
/* eslint-disable */
export interface ContractOverview {
  contractId?: number;
  customerId?: number;

  /**
   * concatenated name of the customer
   */
  customerName?: string;
  monthlyRate?: number;
  vehicleId?: number;

  /**
   * concatenated name of the vehicle
   */
  vehicleName?: string;
  vehiclePrice?: number;

  /**
   * vehicle identification number
   */
  vin?: string;
}

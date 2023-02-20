import { BasePageResponseDTO } from './common.model';

export type ContractOverviewDTO = {
  contractId: number;
  customerId: number;
  customerName: string;
  vehicleId: number;
  vehicleName: string;
  vin: string;
  monthlyRate: number;
  vehiclePrice: number;
};

export type ContractOverviewPageResponseDTO =
  BasePageResponseDTO<ContractOverviewDTO>;

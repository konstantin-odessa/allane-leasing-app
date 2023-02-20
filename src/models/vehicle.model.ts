import { BasePageResponseDTO } from './common.model';

export type VehicleDTO = {
  brand: string;
  id?: number;
  model: string;
  modelYear: number;
  price: number;

  /**
   * Vehicle identification number when the vehicle is produced. During creation of contract it could be empty.
   */
  vin?: string;
};

export type VehiclePageResponseDTO = BasePageResponseDTO<VehicleDTO>;

export type Vehicle = VehicleDTO;

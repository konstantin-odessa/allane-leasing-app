/* tslint:disable */
/* eslint-disable */
export interface Vehicle {
  brand: string;
  id?: number;
  model: string;
  modelYear: number;
  price: number;

  /**
   * Vehicle identification number when the vehicle is produced. During creation of contract it could be empty.
   */
  vin?: string;
}

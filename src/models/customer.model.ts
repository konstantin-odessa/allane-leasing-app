import { BasePageResponseDTO } from './common.model';

export type CustomerDTO = {
  id?: number;
  birthDate: number[];
  firstName: string;
  lastName: string;
};

export class Customer {
  id?: CustomerDTO['id'];
  birthDate: Date;
  firstName: CustomerDTO['firstName'];
  lastName: CustomerDTO['lastName'];

  static mapFromDTO(data: CustomerDTO): Customer {
    return new Customer(data);
  }

  static mapToDTO(data: Customer): CustomerDTO {
    return {
      ...data,
      birthDate: data.birthDate
        .toISOString()
        .split('T')
        .at(0)
        ?.split('-')
        .map(Number) as number[],
    };
  }

  constructor({ id, firstName, lastName, birthDate }: CustomerDTO) {
    this.id = id;
    this.birthDate = new Date(birthDate.join('-'));
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export type CustomerPageResponseDTO = BasePageResponseDTO<CustomerDTO>;

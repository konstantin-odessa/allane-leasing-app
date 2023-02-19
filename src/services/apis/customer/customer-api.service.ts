import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CustomerDTO,
  PageRequestDTO,
  CustomerPageResponseDTO,
  Customer,
} from '../../../models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class CustomerApiService {
  private readonly baseUrl = 'http://localhost:8080/customer';

  constructor(private http: HttpClient) {}

  getCustomer(id: number): Observable<CustomerDTO> {
    return this.http.get<CustomerDTO>(`${this.baseUrl}/${id}`);
  }

  updateCustomer(
    id: CustomerDTO['id'],
    contractDTO: CustomerDTO
  ): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/${id}`,
      contractDTO,
      httpOptions
    );
  }

  deleteCustomer(id: Customer['id']): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  createCustomer(contractDTO: CustomerDTO): Observable<CustomerDTO> {
    return this.http.post<CustomerDTO>(this.baseUrl, contractDTO, httpOptions);
  }

  getCustomers(
    pageRequest: PageRequestDTO
  ): Observable<CustomerPageResponseDTO> {
    return this.http.get<CustomerPageResponseDTO>(`${this.baseUrl}s`, {
      params: pageRequest,
    });
  }
}

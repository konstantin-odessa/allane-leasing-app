import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CustomerDTO,
  PageRequestDTO,
  CustomerPageResponseDTO,
} from '../../../models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class CustomerApiService {
  private readonly API_URL = 'http://localhost:8080/customer';

  constructor(private http: HttpClient) {}

  getCustomer(id: number): Observable<CustomerDTO> {
    return this.http.get<CustomerDTO>(`${this.API_URL}/${id}`);
  }

  updateCustomer(id: number, contractDTO: CustomerDTO): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/${id}`,
      contractDTO,
      httpOptions
    );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  createCustomer(contractDTO: CustomerDTO): Observable<CustomerDTO> {
    return this.http.post<CustomerDTO>(this.API_URL, contractDTO, httpOptions);
  }

  getCustomers(
    pageRequest: PageRequestDTO
  ): Observable<CustomerPageResponseDTO> {
    return this.http.get<CustomerPageResponseDTO>(`${this.API_URL}s`, {
      params: pageRequest,
    });
  }
}

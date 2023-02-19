import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract, ContractDTO, Customer } from '../../../models';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ContractApiService {
  private readonly baseUrl = 'http://localhost:8080/contract';

  constructor(private http: HttpClient) {}

  getContract(id: number): Observable<Contract> {
    return this.http.get<ContractDTO>(`${this.baseUrl}/${id}`).pipe(
      map(data => {
        return { ...data, customer: Customer.mapFromDTO(data.customer) };
      })
    );
  }

  updateContract(
    id: ContractDTO['id'],
    contractDTO: ContractDTO
  ): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/${id}`,
      contractDTO,
      httpOptions
    );
  }

  deleteContract(id: Contract['id']): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  createContract(contractDTO: ContractDTO): Observable<ContractDTO> {
    return this.http.post<ContractDTO>(this.baseUrl, contractDTO, httpOptions);
  }
}

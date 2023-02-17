import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ContractOverviewPageResponseDTO,
  PageRequestDTO,
} from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class ContractOverviewsApiService {
  private readonly API_URL = 'http://localhost:8080/contractoverviews';

  constructor(private http: HttpClient) {}

  getContractOverviews(
    contractOverviewDTO: PageRequestDTO
  ): Observable<ContractOverviewPageResponseDTO> {
    let params = new HttpParams();
    params = params.append('page', contractOverviewDTO.page.toString());
    params = params.append('size', contractOverviewDTO.size.toString());
    params = params.append('sort', contractOverviewDTO.sort.toString());
    return this.http.get<ContractOverviewPageResponseDTO>(this.API_URL, {
      params,
    });
  }
}

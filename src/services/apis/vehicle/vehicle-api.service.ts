import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PageRequestDTO,
  VehicleDTO,
  VehiclePageResponseDTO,
} from '../../../models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class VehicleApiService {
  baseUrl = 'http://localhost:8080/vehicle';

  constructor(private http: HttpClient) {}

  getVehicle(id: number): Observable<VehicleDTO> {
    return this.http.get<VehicleDTO>(`${this.baseUrl}/${id}`);
  }

  createVehicle(vehicle: VehicleDTO): Observable<VehicleDTO> {
    return this.http.post<VehicleDTO>(this.baseUrl, vehicle, httpOptions);
  }

  updateVehicle(
    id: VehicleDTO['id'],
    vehicle: VehicleDTO
  ): Observable<VehicleDTO> {
    return this.http.put<VehicleDTO>(`${this.baseUrl}/${id}`, vehicle);
  }

  deleteVehicle(id: VehicleDTO['id']): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getVehicles(pageRequest: PageRequestDTO): Observable<VehiclePageResponseDTO> {
    return this.http.get<VehiclePageResponseDTO>(`${this.baseUrl}s`, {
      params: pageRequest,
    });
  }
}

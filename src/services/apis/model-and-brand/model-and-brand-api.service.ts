import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BrandDTO, VehicleDTO, VehicleModelDTO } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class ModelAndBrandApiService {
  baseUrl = 'http://localhost:8080/brand';

  constructor(private http: HttpClient) {}

  getBrands(): Observable<BrandDTO[]> {
    return this.http.get<BrandDTO[]>(`${this.baseUrl}s`);
  }

  getModelsByBrandId(brandId: BrandDTO['id']) {
    return this.http.get<VehicleModelDTO[]>(
      `${this.baseUrl}/${brandId}/models`
    );
  }
}

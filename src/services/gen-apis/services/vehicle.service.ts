/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PageRequest } from '../models/page-request';
import { Vehicle } from '../models/vehicle';
import { VehiclePageResponse } from '../models/vehicle-page-response';

@Injectable({
  providedIn: 'root',
})
export class VehicleService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getVehicleForId
   */
  static readonly GetVehicleForIdPath = '/vehicle/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVehicleForId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVehicleForId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Vehicle>> {

    const rb = new RequestBuilder(this.rootUrl, VehicleService.GetVehicleForIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Vehicle>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getVehicleForId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVehicleForId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<Vehicle> {

    return this.getVehicleForId$Response(params,context).pipe(
      map((r: StrictHttpResponse<Vehicle>) => r.body as Vehicle)
    );
  }

  /**
   * Path part for operation updateVehicle
   */
  static readonly UpdateVehiclePath = '/vehicle/{id}';

  /**
   * update vehicle for id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateVehicle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateVehicle$Response(params: {
    id: number;
    body: Vehicle
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, VehicleService.UpdateVehiclePath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * update vehicle for id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateVehicle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateVehicle(params: {
    id: number;
    body: Vehicle
  },
  context?: HttpContext

): Observable<void> {

    return this.updateVehicle$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteVehicle
   */
  static readonly DeleteVehiclePath = '/vehicle/{id}';

  /**
   * delete vehicle for id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteVehicle()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteVehicle$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, VehicleService.DeleteVehiclePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * delete vehicle for id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteVehicle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteVehicle(params: {
    id: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.deleteVehicle$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation createVehicle
   */
  static readonly CreateVehiclePath = '/vehicle';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createVehicle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createVehicle$Response(params: {
    body: Vehicle
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Vehicle>> {

    const rb = new RequestBuilder(this.rootUrl, VehicleService.CreateVehiclePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Vehicle>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createVehicle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createVehicle(params: {
    body: Vehicle
  },
  context?: HttpContext

): Observable<Vehicle> {

    return this.createVehicle$Response(params,context).pipe(
      map((r: StrictHttpResponse<Vehicle>) => r.body as Vehicle)
    );
  }

  /**
   * Path part for operation getAllVehicles
   */
  static readonly GetAllVehiclesPath = '/vehicles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllVehicles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllVehicles$Response(params: {

    /**
     * paginations could also be done by providing simply the query parameters page and size for example /vehicles?page=0&size=10
     */
    page: PageRequest;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<VehiclePageResponse>> {

    const rb = new RequestBuilder(this.rootUrl, VehicleService.GetAllVehiclesPath, 'get');
    if (params) {
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VehiclePageResponse>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllVehicles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllVehicles(params: {

    /**
     * paginations could also be done by providing simply the query parameters page and size for example /vehicles?page=0&size=10
     */
    page: PageRequest;
  },
  context?: HttpContext

): Observable<VehiclePageResponse> {

    return this.getAllVehicles$Response(params,context).pipe(
      map((r: StrictHttpResponse<VehiclePageResponse>) => r.body as VehiclePageResponse)
    );
  }

}

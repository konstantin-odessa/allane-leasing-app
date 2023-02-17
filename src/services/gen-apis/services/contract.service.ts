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

import { Contract } from '../models/contract';

@Injectable({
  providedIn: 'root',
})
export class ContractService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation getContractForId
   */
  static readonly GetContractForIdPath = '/contract/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getContractForId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContractForId$Response(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Contract>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ContractService.GetContractForIdPath,
      'get'
    );
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Contract>;
        })
      );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getContractForId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContractForId(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<Contract> {
    return this.getContractForId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Contract>) => r.body as Contract)
    );
  }

  /**
   * Path part for operation updateContract
   */
  static readonly UpdateContractPath = '/contract/{id}';

  /**
   * update contract for id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateContract()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateContract$Response(
    params: {
      id: number;
      body: Contract;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ContractService.UpdateContractPath,
      'put'
    );
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
          context: context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * update contract for id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateContract$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateContract(
    params: {
      id: number;
      body: Contract;
    },
    context?: HttpContext
  ): Observable<void> {
    return this.updateContract$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteContract
   */
  static readonly DeleteContractPath = '/contract/{id}';

  /**
   * delete contract for id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteContract()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteContract$Response(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ContractService.DeleteContractPath,
      'delete'
    );
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
          context: context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: undefined,
          }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * delete contract for id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteContract$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteContract(
    params: {
      id: number;
    },
    context?: HttpContext
  ): Observable<void> {
    return this.deleteContract$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation createContract
   */
  static readonly CreateContractPath = '/contract';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createContract()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createContract$Response(
    params: {
      body: Contract;
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Contract>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      ContractService.CreateContractPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
          context: context,
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Contract>;
        })
      );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createContract$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createContract(
    params: {
      body: Contract;
    },
    context?: HttpContext
  ): Observable<Contract> {
    return this.createContract$Response(params, context).pipe(
      map((r: StrictHttpResponse<Contract>) => r.body as Contract)
    );
  }
}

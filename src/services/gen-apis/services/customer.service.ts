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

import { Customer } from '../models/customer';
import { CustomerPageResponse } from '../models/customer-page-response';
import { PageRequest } from '../models/page-request';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getCustomerForId
   */
  static readonly GetCustomerForIdPath = '/customer/{id}';

  /**
   * get customer for id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCustomerForId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomerForId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Customer>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerService.GetCustomerForIdPath, 'get');
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
        return r as StrictHttpResponse<Customer>;
      })
    );
  }

  /**
   * get customer for id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCustomerForId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomerForId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<Customer> {

    return this.getCustomerForId$Response(params,context).pipe(
      map((r: StrictHttpResponse<Customer>) => r.body as Customer)
    );
  }

  /**
   * Path part for operation updateCustomer
   */
  static readonly UpdateCustomerPath = '/customer/{id}';

  /**
   * update customer for id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCustomer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCustomer$Response(params: {
    id: number;
    body: Customer
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerService.UpdateCustomerPath, 'put');
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
   * update customer for id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCustomer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCustomer(params: {
    id: number;
    body: Customer
  },
  context?: HttpContext

): Observable<void> {

    return this.updateCustomer$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteCustomer
   */
  static readonly DeleteCustomerPath = '/customer/{id}';

  /**
   * delete customer for id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCustomer()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCustomer$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerService.DeleteCustomerPath, 'delete');
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
   * delete customer for id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCustomer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCustomer(params: {
    id: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.deleteCustomer$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation createCustomer
   */
  static readonly CreateCustomerPath = '/customer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCustomer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCustomer$Response(params: {
    body: Customer
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Customer>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerService.CreateCustomerPath, 'post');
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
        return r as StrictHttpResponse<Customer>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createCustomer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCustomer(params: {
    body: Customer
  },
  context?: HttpContext

): Observable<Customer> {

    return this.createCustomer$Response(params,context).pipe(
      map((r: StrictHttpResponse<Customer>) => r.body as Customer)
    );
  }

  /**
   * Path part for operation getAllCustomers
   */
  static readonly GetAllCustomersPath = '/customers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCustomers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomers$Response(params: {

    /**
     * paginations could also be done by providing simply the query parameters page and size for example /customers?page=0&size=10
     */
    page: PageRequest;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CustomerPageResponse>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerService.GetAllCustomersPath, 'get');
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
        return r as StrictHttpResponse<CustomerPageResponse>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCustomers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCustomers(params: {

    /**
     * paginations could also be done by providing simply the query parameters page and size for example /customers?page=0&size=10
     */
    page: PageRequest;
  },
  context?: HttpContext

): Observable<CustomerPageResponse> {

    return this.getAllCustomers$Response(params,context).pipe(
      map((r: StrictHttpResponse<CustomerPageResponse>) => r.body as CustomerPageResponse)
    );
  }

}

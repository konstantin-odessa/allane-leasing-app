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

import { Brand } from '../models/brand';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ModelAndBrandService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getBrands
   */
  static readonly GetBrandsPath = '/brands';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBrands()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBrands$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Brand>>> {

    const rb = new RequestBuilder(this.rootUrl, ModelAndBrandService.GetBrandsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Brand>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBrands$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBrands(params?: {
  },
  context?: HttpContext

): Observable<Array<Brand>> {

    return this.getBrands$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Brand>>) => r.body as Array<Brand>)
    );
  }

  /**
   * Path part for operation getModelsByBrandId
   */
  static readonly GetModelsByBrandIdPath = '/brand/{id}/models';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getModelsByBrandId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getModelsByBrandId$Response(params: {

    /**
     * brand id
     */
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<Model>>> {

    const rb = new RequestBuilder(this.rootUrl, ModelAndBrandService.GetModelsByBrandIdPath, 'get');
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
        return r as StrictHttpResponse<Array<Model>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getModelsByBrandId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getModelsByBrandId(params: {

    /**
     * brand id
     */
    id: number;
  },
  context?: HttpContext

): Observable<Array<Model>> {

    return this.getModelsByBrandId$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<Model>>) => r.body as Array<Model>)
    );
  }

}

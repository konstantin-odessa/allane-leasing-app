import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { delay, Observable } from 'rxjs';

@Injectable()
export class DelayInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // artificial delay request to observe how UX is handled
    return next.handle(request).pipe(delay(1000));
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorResponse } from '../../models';
import { SNACK_BAR_DURATION } from '../../constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorNotifierInterceptor implements HttpInterceptor {
  constructor(private snackBarService: MatSnackBar) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else if (error.error instanceof ProgressEvent) {
          // CORS error
          errorMessage = error.message;
        } else {
          // server-side error
          const errorResponse: ErrorResponse = {
            error: error.error.error,
            path: error.error.path,
            status: error.status,
            timestamp: error.error.timestamp,
          };
          errorMessage = `Error Code: ${error.status}\nMessage: ${errorResponse.error}`;
        }

        this.snackBarService.open(errorMessage, 'Close', {
          duration: SNACK_BAR_DURATION,
          verticalPosition: 'top',
        });

        return throwError(errorMessage);
      })
    );
  }
}

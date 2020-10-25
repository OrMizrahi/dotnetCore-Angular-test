import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { finalize, catchError } from 'rxjs/operators';
import { SpinnerService } from './services/spinner/spinner.service';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class httpInterceptor implements HttpInterceptor {

  private count = 0;

  constructor(private loaderService: SpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.count === 0) {
      this.loaderService.setSpinner(true);
    }
    this.count++;
    return next.handle(req)
      .pipe(
        catchError(this.handleError)
        , finalize(() => {
          this.count--;
        if (this.count === 0) {
          this.loaderService.setSpinner(false);
        }
        }))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}

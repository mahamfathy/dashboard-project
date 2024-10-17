import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor() {}
  logErrorRequest(errorRes: HttpErrorResponse): Observable<any> {
    if (errorRes.status === 0) {
      console.log(`client side error: ${errorRes.status} ,${errorRes.error}`);
    } else {
      console.log(`backend side error: ${errorRes.status} ,${errorRes.error}`);
    }
    return throwError(() => new Error(`something bad happened`));
  }
}

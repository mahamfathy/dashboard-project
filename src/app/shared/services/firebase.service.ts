import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { firebaseUrl } from '../firebase/firebase-url';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private http: HttpClient) {}
  getRequest(name: string): Observable<any> {
    return this.http
      .get(`${firebaseUrl}${name}.json`)
      .pipe(catchError(this.handleError));
  }
  private handleError(errorRes: HttpErrorResponse): Observable<any> {
    if (errorRes.status === 0) {
      console.log(`client side error: ${errorRes.message} ,${errorRes.error}`);
    } else {
      console.log(`backend side error: ${errorRes.message} ,${errorRes.error}`);
    }
    return throwError(() => new Error(`something bad happened`));
  }
}

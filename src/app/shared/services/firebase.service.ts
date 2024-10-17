import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { firebaseUrl } from '../firebase/firebase-url';
import { HandleErrorService } from './handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private http: HttpClient,
    private handleError: HandleErrorService
  ) {}
  getRequest(name: string): Observable<any> {
    return this.http.get(`${firebaseUrl}${name}.json`);
    // .pipe(catchError(this.handleError.logErrorRequest));
  }
}

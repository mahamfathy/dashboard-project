import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { firebaseUrl } from '../firebase/firebase-url';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private http: HttpClient) {}
  getRequest(name: string): Observable<any> {
    return this.http.get(`${firebaseUrl}${name}.json`);
  }
}

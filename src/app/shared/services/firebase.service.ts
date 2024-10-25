import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  postRequest(
    url: string,
    body: any,
    options: { headers: HttpHeaders }
  ): Observable<any> {
    return this.http.post(url, body, options);
  }
  patchRequest(
    url: string,
    body: any,
    options: { headers: HttpHeaders }
  ): Observable<any> {
    return this.http.patch(url, body, options);
  }
  deleteRequest(
    url: string,
    options: { headers: HttpHeaders }
  ): Observable<any> {
    return this.http.delete(url, options);
  }
}

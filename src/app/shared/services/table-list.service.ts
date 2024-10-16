import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { firebaseUrl } from '../firebase/firebase-url';

@Injectable({
  providedIn: 'root',
})
export class TableListService {
  constructor(private http: HttpClient) {}
  getList(): Observable<any> {
    return this.http.get(`${firebaseUrl}employees.json`);
  }
}

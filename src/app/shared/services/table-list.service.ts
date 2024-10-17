import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class TableListService {
  constructor(private firebaseService: FirebaseService) {}
  getList(): Observable<any> {
    return this.firebaseService.getRequest('employees');
  }
}

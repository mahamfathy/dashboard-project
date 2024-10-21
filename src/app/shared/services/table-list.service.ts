import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class TableListService {
  constructor(private firebaseService: FirebaseService) {}
  getList(): Observable<Array<Employee>> {
    return this.firebaseService.getRequest('employees').pipe(
      map((employees: Employee) => {
        return Object.entries(employees).map(([key, value]) => {
          return { ...value, id: value.id, scrambledId: key };
        });
      })
    );
  }
}

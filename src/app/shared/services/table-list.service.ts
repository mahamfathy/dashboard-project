import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { firebaseUrl } from '../firebase/firebase-url';
import { IEmployee } from '../models/IEmployee';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class TableListService {
  constructor(private firebaseService: FirebaseService) {}
  getEmployees(): Observable<Array<IEmployee>> {
    return this.firebaseService.getRequest('employees').pipe(
      map((employees: IEmployee) => {
        return Object.entries(employees).map(([key, value]) => {
          return { ...value, scrambledId: key };
        }) as Array<IEmployee>;
      })
    );
  }
  addEmployee(employee: IEmployee): Observable<any> {
    return this.firebaseService.postRequest(
      `${firebaseUrl}employees.json`,
      employee,
      { headers: new HttpHeaders({ 'content-type': 'application/json' }) }
    );
  }
  updateEmployee(id: string, employee: Partial<IEmployee>): Observable<any> {
    const { scrambledId, ...updatedEmployee } = employee;
    return this.firebaseService.patchRequest(
      `${firebaseUrl}employees/${id}.json`,
      updatedEmployee,
      { headers: new HttpHeaders({ 'content-type': 'application/json' }) }
    );
  }
  deleteEmployee(id: string): Observable<any> {
    return this.firebaseService.deleteRequest(
      `${firebaseUrl}employees/${id}.json`,
      { headers: new HttpHeaders({ 'content-type': 'application/json' }) }
    );
  }
}

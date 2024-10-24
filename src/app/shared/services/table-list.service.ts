import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { firebaseUrl } from '../firebase/firebase-url';
import { Employee } from '../models/employee';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class TableListService {
  constructor(private firebaseService: FirebaseService) {}
  getEmployees(): Observable<Array<Employee>> {
    return this.firebaseService.getRequest('employees').pipe(
      map((employees: Employee) => {
        return Object.entries(employees).map(([key, value]) => {
          return { ...value, scrambledId: key };
        }) as Array<Employee>;
      })
    );
  }
  addEmployee(employee: Employee): Observable<any> {
    return this.firebaseService.postRequest(
      `${firebaseUrl}employees.json`,
      employee,
      { 'content-type': 'application/json' }
    );
  }
  updateEmployee(id: string, employee: Partial<Employee>): Observable<any> {
    const { scrambledId, ...updatedEmployee } = employee;
    return this.firebaseService.patchRequest(
      `${firebaseUrl}/employees/${id}.json`,
      updatedEmployee,
      {}
    );
  }
  deleteEmployee(id: string): Observable<any> {
    return this.firebaseService.deleteRequest(id);
  }
}

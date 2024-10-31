import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private openSidebarSubject = new BehaviorSubject<boolean>(false);
  isSidebarOpen$ = this.openSidebarSubject.asObservable();
  constructor() {}
  toggleSidebar(): void {
    this.openSidebarSubject.next(!this.openSidebarSubject.getValue());
  }
}

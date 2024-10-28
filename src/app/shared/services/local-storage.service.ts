import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private tokenSubject = new BehaviorSubject<string | null>(
    this.getItem('token')
  );
  token$ = this.tokenSubject.asObservable();
  constructor() {}
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    if (key == 'token') {
      this.tokenSubject.next(value);
    }
  }
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
    if (key == 'token') {
      this.tokenSubject.next(null);
    }
  }
  clearItem(key: string): void {
    localStorage.removeItem(key);
  }
}

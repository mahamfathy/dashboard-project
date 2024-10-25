import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { signInUrl, signUpUrl } from '../firebase/firebase-url';
import { FirebaseService } from './firebase.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  LoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.LoggedInSubject.asObservable();
  constructor(
    private firebaseService: FirebaseService,
    private localStorageService: LocalStorageService
  ) {}
  signUp(email: string, password: string): Observable<any> {
    return this.firebaseService.postRequest(
      signUpUrl,
      { email, password, returnSecureToken: true },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return this.firebaseService.postRequest(
      signInUrl,
      { email, password, returnSecureToken: true },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
  async signOut(): Promise<void> {
    this.localStorageService.removeItem('token');
    this.LoggedInSubject.next(false);
  }
  isLoggedIn(): boolean {
    return !!this.localStorageService.getItem('token');
  }
}

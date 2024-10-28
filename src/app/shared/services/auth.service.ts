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
  usernameSubject = new BehaviorSubject<string | null>(this.getUsername());
  username$ = this.usernameSubject.asObservable();
  constructor(
    private firebaseService: FirebaseService,
    private localStorageService: LocalStorageService
  ) {}
  signUp(email: string, password: string, username: string): Observable<any> {
    this.localStorageService.setItem('username', username);
    this.usernameSubject.next(username);
    console.log(email, password, username);
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
    this.localStorageService.removeItem('username');
    this.LoggedInSubject.next(false);
    this.usernameSubject.next(null);
  }
  isLoggedIn(): boolean {
    return !!this.localStorageService.getItem('token');
  }
  getUsername(): string | null {
    return this.localStorageService.getItem('username');
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { signInUrl, signUpUrl } from '../firebase/firebase-url';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firebaseService: FirebaseService) {}
  signUp(email: string, password: string): Observable<any> {
    return this.firebaseService.postRequest(
      signUpUrl,
      { email, password, returnSecureToken: true },
      { 'Content-Type': 'application/json' }
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return this.firebaseService.postRequest(
      signInUrl,
      { email, password, returnSecureToken: true },
      { 'Content-Type': 'application/json' }
    );
  }
}

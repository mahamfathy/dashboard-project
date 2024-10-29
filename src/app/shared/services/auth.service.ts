import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { signInUrl, signUpUrl } from '../firebase/firebase-url';
import { IProfile } from '../models/IProfile';
import { FirebaseService } from './firebase.service';
import { LocalStorageService } from './local-storage.service';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  LoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.LoggedInSubject.asObservable();
  usernameSubject = new BehaviorSubject<string | null>(this.getUsername());
  username$ = this.usernameSubject.asObservable();
  imagePathSubject = new BehaviorSubject<string | null>(this.getImagePath());
  imagePath$ = this.imagePathSubject.asObservable();
  profileDataSubject = new BehaviorSubject<IProfile>(this.getProfileData());
  profile$ = this.profileDataSubject.asObservable();
  constructor(
    private firebaseService: FirebaseService,
    private localStorageService: LocalStorageService,
    private navigationService: NavigationService
  ) {}
  signUp(email: string, password: string, username: string): Observable<any> {
    return this.firebaseService
      .postRequest(
        signUpUrl,
        { email, password, returnSecureToken: true },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(
        tap((response) => {
          const token = response.idToken;
          this.localStorageService.setItem('token', token);
          this.localStorageService.setItem('username', username);
          this.localStorageService.setItem(
            'imagePath',
            './assets/images/default-avatar.avif'
          );
          this.usernameSubject.next(username);
          this.imagePathSubject.next('./assets/images/default-avatar.avif');

          this.navigationService.navigateByUrl('secure/dashboard');
        })
      );
  }

  signIn(email: string, password: string, _: string): Observable<any> {
    return this.firebaseService
      .postRequest(
        signInUrl,
        { email, password, returnSecureToken: true },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(
        tap((response) => {
          const token = response.idToken;
          this.localStorageService.setItem('token', token);
          const imagePath =
            this.localStorageService.getItem('imagePath') ||
            './assets/images/default-avatar.avif';
          const username = this.localStorageService.getItem('username');
          if (username) {
            this.usernameSubject.next(username);
          }
          this.imagePathSubject.next(imagePath);
          this.navigationService.navigateByUrl('secure/dashboard');
        })
      );
  }
  async signOut(): Promise<void> {
    this.localStorageService.removeItem('token');
    this.LoggedInSubject.next(false);
  }
  isLoggedIn(): boolean {
    return !!this.localStorageService.getItem('token');
  }
  getUsername(): string | null {
    return this.localStorageService.getItem('username');
  }
  getImagePath(): string | null {
    return this.localStorageService.getItem('imagePath');
  }
  updateImagePath(newImagePath: string): void {
    this.localStorageService.setItem('imagePath', newImagePath);
    this.imagePathSubject.next(newImagePath);
  }
  updateProfileData(newProfileData: IProfile): void {
    this.localStorageService.setItem('profile', JSON.stringify(newProfileData));
    this.profileDataSubject.next(newProfileData);
  }
  private getProfileData(): IProfile {
    const savedProfile = this.localStorageService.getItem('profile');
    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          name: 'Default Name',
          username: '@default',
          imagePath: './assets/images/default-avatar.avif',
          backgroundImage: './assets/images/background.jpg',
          imageAlt: 'Default Avatar',
          backgroundAlt: 'Background image',
          aboutMe: 'Add Bio',
        };
  }
}

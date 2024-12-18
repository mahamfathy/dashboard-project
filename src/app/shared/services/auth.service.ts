import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
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

          const defaultImagePath = './assets/images/default-avatar.avif';
          this.localStorageService.setItem('imagePath', defaultImagePath);
          this.usernameSubject.next(username);
          this.imagePathSubject.next(defaultImagePath);

          const initialProfile: IProfile = {
            name: username,
            username: `@${username}`,
            imagePath: defaultImagePath,
            backgroundImage: './assets/images/background.jpg',
            imageAlt: 'Avatar image',
            backgroundAlt: 'Background image',
            aboutMe: 'Add Bio',
          };
          this.localStorageService.setItem(
            'profile',
            JSON.stringify(initialProfile)
          );
          this.profileDataSubject.next(initialProfile);

          this.navigationService.navigateByUrl('/secure/dashboard');
        }),
        catchError((error) => {
          console.error('Sign Up Error:', error);
          return of(null); // Handle the error as you see fit
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

          const username = this.localStorageService.getItem('username');
          const imagePath = this.localStorageService.getItem('imagePath');

          if (username) {
            this.usernameSubject.next(username);
          }

          const savedProfile = this.getProfileData();
          if (savedProfile) {
            this.profileDataSubject.next(savedProfile);
            this.imagePathSubject.next(savedProfile.imagePath || imagePath);
          }
          this.navigationService.navigateByUrl('secure/dashboard');
        }),
        catchError((error) => {
          console.error('Sign In Error:', error);
          return of(null); // Handle the error as you see fit
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
    this.profileDataSubject.next(newProfileData);
    this.localStorageService.setItem('profile', JSON.stringify(newProfileData));
  }
  private getProfileData(): IProfile {
    const savedProfile = this.localStorageService.getItem('profile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }

    return {
      name: 'Default Name',
      username: 'Default Username',
      imagePath: './assets/images/default-avatar.avif',
      backgroundImage: './assets/images/background.jpg',
      imageAlt: 'Default Avatar Image Alt',
      backgroundAlt: 'Default Background Image Alt',
      aboutMe: 'Add Bio',
    };
  }
}

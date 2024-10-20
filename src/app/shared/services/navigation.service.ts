import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url);
  }
  navigateToHome(): void {
    this.router.navigate(['/public']);
  }
  navigateToLogin(): void {
    this.router.navigate(['/account']);
  }
  navigateToRegister(): void {
    this.router.navigate(['/account/register']);
  }
}

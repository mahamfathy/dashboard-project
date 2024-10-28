import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'theme';
  private readonly defaultTheme = 'light-theme';
  private readonly darkTheme = 'dark-theme';
  constructor(private localStorageService: LocalStorageService) {}

  setTheme(theme: string): void {
    this.localStorageService.setItem(this.themeKey, theme);
    this.applyTheme(theme);
  }
  getTheme(): string {
    return this.localStorageService.getItem(this.themeKey) || this.defaultTheme;
  }

  isDarkTheme(): boolean {
    return this.getTheme() === this.darkTheme;
  }
  toggleTheme(): void {
    this.setTheme(this.isDarkTheme() ? this.defaultTheme : this.darkTheme);
  }
  applyTheme(theme: string): void {
    const body = document.body;
    body.classList.remove(this.defaultTheme, this.darkTheme);
    body.classList.add(theme);
  }
}

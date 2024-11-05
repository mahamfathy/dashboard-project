import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly languageKey = 'lang';
  private html: HTMLElement;
  private currentLanguage: string;
  private readonly defaultLanguageKey = 'ar';
  languageChange = new BehaviorSubject<string>(this.defaultLanguageKey);

  constructor(
    private translationService: TranslationService,
    private localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.html = this.document.getElementsByTagName('html')[0];
    this.currentLanguage =
      localStorage.getItem(this.languageKey) || this.defaultLanguageKey;
    this.languageChange.next(this.currentLanguage);
  }
  initAppLanguage(): void {
    this.translationService.setDefaultLanguage(this.currentLanguage);
    this.updateLayout();
  }
  changeLanguage(lang: string): void {
    if (lang !== this.currentLanguage) {
      this.setLanguage(lang);
      this.languageChange.next(lang);
    }
  }
  private setLanguage(lang: string): void {
    this.currentLanguage = lang;
    this.localStorageService.setItem(this.languageKey, lang);
    this.translationService.use(lang);
    this.updateLayout();
  }
  private updateLayout(): void {
    this.html.lang = this.currentLanguage;
    this.document.body.dir = this.getDirection();
  }
  private getDirection(): string {
    return this.currentLanguage === this.defaultLanguageKey ? 'rtl' : 'ltr';
  }
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
}

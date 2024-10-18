import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly languageKey = 'lang';
  private html: HTMLElement;
  private currentLanguage: string;
  constructor(
    private translationService: TranslationService,
    private localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.html = this.document.getElementsByTagName('html')[0];
    this.currentLanguage = localStorage.getItem(this.languageKey) || 'en';
  }
  initAppLanguage(): void {
    this.translationService.setDefaultLanguage(this.currentLanguage);
    this.updateLayout();
  }
  changeLanguage(lang: string): void {
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
    return this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }
}

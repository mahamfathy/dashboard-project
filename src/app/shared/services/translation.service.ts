import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translateService: TranslationService) {}
  setDefaultLang(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }
}

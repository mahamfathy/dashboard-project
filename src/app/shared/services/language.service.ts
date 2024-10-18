import { inject, Injectable } from '@angular/core';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  translationService = inject(TranslationService);

  initAppLanguage(): void {
    this.translationService.setDefaultLanguage('ar');
  }
  changeLanguage(lang: string): void {
    this.translationService.use(lang);
  }
}

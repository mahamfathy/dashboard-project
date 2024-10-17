import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translateService: TranslateService) {}
  setDefaultLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }
}

import { CurrencyPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Pipe({
  name: 'currencySwitch',
  standalone: true,
})
export class CurrencySwitchPipe implements PipeTransform {
  private currencyPipe = inject(CurrencyPipe);
  constructor(private localStorageService: LocalStorageService) {}
  transform(value: number): string | null {
    const lang = this.localStorageService.getItem('lang') || 'en';
    return lang === 'ar'
      ? this.currencyPipe.transform(value, 'ج.م', 'symbol', '1.0-0', 'ar-EG')
      : this.currencyPipe.transform(value, 'EGP', 'symbol', '1.0-0', 'en-US');
  }
}

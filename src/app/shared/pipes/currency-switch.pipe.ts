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
  transform(value: number | string): string | null {
    if (isNaN(Number(value))) {
      console.error('Invalid salary value:', value);
      return 'Invalid Salary'; // Handle invalid value gracefully
    }

    const lang = this.localStorageService.getItem('lang') || 'en';
    const parsedValue = typeof value === 'string' ? parseFloat(value) : value;

    return lang === 'ar'
      ? this.currencyPipe.transform(
          parsedValue,
          'ج.م',
          'symbol',
          '1.0-0',
          'ar-EG'
        )
      : this.currencyPipe.transform(
          parsedValue,
          'EGP',
          'symbol',
          '1.0-0',
          'en-US'
        );
  }
}

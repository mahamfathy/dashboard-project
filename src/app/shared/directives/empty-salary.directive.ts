import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';

@Directive({
  selector: '[appEmptySalary]',
  standalone: true,
})
export class EmptySalaryDirective implements OnInit {
  @Input('appEmptySalary') salary!: number;
  private languageSubscription!: Subscription;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.updateSalaryDisplay();
    this.languageSubscription = this.languageService.languageChange?.subscribe(
      () => {
        this.updateSalaryDisplay();
      }
    );
  }

  private updateSalaryDisplay(): void {
    const language = this.languageService.getCurrentLanguage();
    const currencySymbol = language === 'ar' ? 'ج.م' : 'EGP';
    const displaySalary =
      this.salary > 0 ? `${this.salary} ${currencySymbol}` : '---';

    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerText',
      displaySalary
    );
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}

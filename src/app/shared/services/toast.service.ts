import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private toastr: ToastrService,
    private localStorageService: LocalStorageService
  ) {}
  private getPositionClass(): string {
    const lang = this.localStorageService.getItem('lang') || 'en';
    return lang === 'ar' ? 'toast-bottom-left' : 'toast-bottom-right';
  }
  showSuccess(message?: string, title?: string): void {
    const positionClass = this.getPositionClass();
    this.toastr.success(message, title, { positionClass });
  }
  showError(message?: string, title?: string): void {
    const positionClass = this.getPositionClass();
    this.toastr.error(message, title, { positionClass });
  }
  showInfo(message: string, title: string) {
    const positionClass = this.getPositionClass();
    this.toastr.info(message, title, {
      positionClass,
    });
  }

  showWarning(message: string, title: string) {
    const positionClass = this.getPositionClass();
    this.toastr.warning(message, title, {
      positionClass,
    });
  }
}

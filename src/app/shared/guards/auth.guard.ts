import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { NavigationService } from '../services/navigation.service';

export const authGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const navigationService = inject(NavigationService);
  const token = localStorageService.getItem('token');
  return token ? true : navigationService.navigateByUrl('/account/login');
};

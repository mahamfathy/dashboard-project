import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { secureGuard } from './shared/guards/secure.guard';

export const routes: Routes = [
  {
    path: 'public',
    loadChildren: () =>
      import('./public/public.routes').then(
        (routes) => routes.lazyRoutesPublic
      ),
    canMatch: [secureGuard],
  },
  {
    path: 'secure',
    loadChildren: () =>
      import('./secure/secure.routes').then(
        (routes) => routes.lazyRoutesSecure
      ),
    // canActivate: [authGuard],
    canMatch: [secureGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: '/account/login', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

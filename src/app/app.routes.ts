import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'public',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'secure',
    loadChildren: () =>
      import('./secure/secure.module').then((m) => m.SecureModule),
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

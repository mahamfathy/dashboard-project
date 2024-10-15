import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'public',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  // { path: 'dashboard', component: DashboardOverviewComponent },
  // { path: 'icons', component: IconsComponent },
  // { path: 'maps', component: MapsComponent },
  // { path: 'notifications', component: NotificationsComponent },
  // { path: 'user-profile', component: UserProfileComponent },
  // { path: 'table-list', component: TableListComponent },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

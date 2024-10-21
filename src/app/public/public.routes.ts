import { Routes } from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';
import { PublicComponent } from './public.component';

export const lazyRoutesPublic: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      { path: '', redirectTo: 'notifications', pathMatch: 'full' },
    ],
  },
];

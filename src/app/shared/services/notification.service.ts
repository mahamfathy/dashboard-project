import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { firebaseUrl } from '../firebase/firebase-url';
import { INotification } from '../models/INotification';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private firebaseService: FirebaseService) {}
  getNotifications(): Observable<INotification[]> {
    return this.firebaseService.getRequest('notifications').pipe(
      map((response) => {
        if (response) {
          return Object.keys(response).map((key) => ({
            id: key,
            ...response[key],
          }));
        } else {
          return [];
        }
      })
    );
  }

  addNotification(notification: INotification): void {
    const newNotification = {
      ...notification,
      time: new Date().toISOString(),
      read: false,
    };
    this.firebaseService
      .postRequest(`${firebaseUrl}notifications.json`, newNotification, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .subscribe();
  }
  getNotificationById(notificationId: string): Observable<INotification> {
    return this.firebaseService
      .getRequest(`notifications/${notificationId}.json`)
      .pipe(
        map((response) => ({
          id: notificationId,
          ...response,
        }))
      );
  }
  markAsRead(notificationId: string): void {
    this.firebaseService
      .patchRequest(
        `${firebaseUrl}/markAsRead/${notificationId}.json`,
        { read: true },
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
      )
      .subscribe(() => console.log('Notification marked as read'));
  }
  getUnreadCount(): Observable<number> {
    return this.getNotifications().pipe(
      map(
        (notifications) =>
          notifications.filter((notification) => !notification.read).length
      )
    );
  }
}

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
      .subscribe(
        (response) => {
          console.log('Notification added with ID:', response.name); // Log the Firebase-generated ID

          // Fetch the newly created notification
          this.getNotificationById(response.name).subscribe(
            (createdNotification) => {
              console.log('Created Notification:', createdNotification);
            }
          );
        },
        (error) => {
          console.error('Error adding notification:', error);
        }
      );
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

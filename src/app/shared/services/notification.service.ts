import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { firebaseUrl } from '../firebase/firebase-url';
import { INotification } from '../models/INotification';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private unreadCountSubject = new BehaviorSubject<number>(0);
  unreadCount$ = this.unreadCountSubject.asObservable();
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private firebaseService: FirebaseService) {
    this.updateUnreadCount();
  }
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
        headers: this.headers,
      })
      .subscribe(() => this.updateUnreadCount());
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
          headers: this.headers,
        }
      )
      .subscribe(() => this.updateUnreadCount());
  }
  private updateUnreadCount(): void {
    this.getNotifications()
      .pipe(
        map(
          (notifications) =>
            notifications.filter((notification) => !notification.read).length
        )
      )
      .subscribe((unreadCount) => this.unreadCountSubject.next(unreadCount));
  }
}

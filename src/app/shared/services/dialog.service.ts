import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDeleteModalComponent } from '../components/confirm-delete-modal/confirm-delete-modal.component';
import { IEmployee } from '../models/IEmployee';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}
  openConfirmDeleteDialog(employee: IEmployee): MatDialogRef<unknown, any> {
    return this.dialog.open(ConfirmDeleteModalComponent, {
      data: employee,
    });
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEmployee } from '../../models/IEmployee';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.scss',
})
export class ConfirmDeleteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: IEmployee
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.dialogRef.close({ confirmDelete: true });
  }
}

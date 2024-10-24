import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../models/employee';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-confirm-delete-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.scss',
})
export class ConfirmDeleteModalComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDeleteModalComponent>);
  readonly employee = inject<Employee>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);

  onNoClick(): void {
    this.dialogRef.close();
  }
}

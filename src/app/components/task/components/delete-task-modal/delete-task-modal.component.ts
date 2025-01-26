import { Component, Inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { SharedMaterialModule } from '../../../shared-material.module'

@Component({
  selector: 'app-delete-task-modal',
  templateUrl: './delete-task-modal.component.html',
  styleUrls: ['./delete-task-modal.component.css'],
  imports: [SharedMaterialModule]
})
export class DeleteTaskModalComponent {
  taskTitle = ''
  constructor(
    public dialogRef: MatDialogRef<DeleteTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, title: string }
  ) {
    this.taskTitle = data.title
  }

  onCancel(): void {
    this.dialogRef.close(false)
  }

  onDelete(): void {
    this.dialogRef.close(true)
  }
}

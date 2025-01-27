import { Component, Inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { SharedMaterialModule } from '../../../shared-material.module'

@Component({
  selector: 'app-add-edit-task-modal',
  standalone: true,
  imports: [SharedMaterialModule],
  templateUrl: './add-edit-task-modal.component.html',
  styleUrls: ['./add-edit-task-modal.component.css']
})
export class AddAndEditTaskModalComponent {
  taskForm: FormGroup
  statusOptions = ['PENDING', 'IN_PROGRESS', 'COMPLETED']

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAndEditTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      id: [data?.id || ''],
      title: [data?.title || '', [Validators.required]],
      description: [data?.description || '', [Validators.required]],
      deadline: [data?.deadline || '', [Validators.required]],
      status: [data?.status || '', [Validators.required]]
    })
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  onSave(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value)
    }
  }
}

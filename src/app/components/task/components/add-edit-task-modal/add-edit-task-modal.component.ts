import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
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

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddAndEditTaskModalComponent>) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      status: ['', [Validators.required]]
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

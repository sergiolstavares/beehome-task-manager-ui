import { Component, Inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { SharedMaterialModule } from '../../../shared-material.module'
import { decodeStatus } from '../../../../common/status'
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core'

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: { dateInput: 'DD/MM/YYYY' },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'app-add-edit-task-modal',
  standalone: true,
  imports: [SharedMaterialModule],
  templateUrl: './add-edit-task-modal.component.html',
  styleUrls: ['./add-edit-task-modal.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }]
})
export class AddAndEditTaskModalComponent {
  taskForm: FormGroup
  statusOptions = ['PENDING', 'IN_PROGRESS', 'COMPLETED']

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAndEditTaskModalComponent>,
    private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dateAdapter.setLocale('pt-BR')

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

  decodeStatus(status: string) {
    return decodeStatus(status)
  }

  disablePastDates = (date: Date | null): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date ? date >= today : false
  }
}

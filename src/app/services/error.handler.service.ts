import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { NotificationService } from './notification.service'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private notificationService: NotificationService, private router: Router) {}

  handleError(error: HttpErrorResponse): void {
    let errorMessage = 'Ocorreu um erro inesperado.'

    if (error.status === 403) {
      this.router.navigate(['/auth'])
    }

    if (error.error.message) {
      errorMessage = `${error.error.message}`
    }

    this.notificationService.showError(errorMessage)
  }
}

import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { SharedMaterialModule } from '../shared-material.module'

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [SharedMaterialModule]
})
export class AuthComponent {
  authForm: FormGroup
  errorMessage: string | null = null

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    })
  }

  async onSubmit() {
    if (this.authForm.invalid) {
      return
    }

    const { email, password } = this.authForm.value

    try {
      const response = await this.authService.login(email, password)
      if (response) {
        localStorage.setItem('token', response.token)
        await this.router.navigate(['/task'])
      } else {
        this.errorMessage = 'Credenciais inválidas.'
      }
    } catch (err) {
      this.errorMessage = 'Ocorreu um erro inesperado.'
    }
  }

  async goToRegister() {
    await this.router.navigate(['/register'])
  }
}


import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { SharedMaterialModule } from '../shared-material.module'
import { decodeAndSaveToken } from '../../services/http.service'

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [SharedMaterialModule],
})
export class AuthComponent {
  authForm: FormGroup
  isLoginMode = true
  errorMessage: string | null = null

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    })
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode
    if (this.isLoginMode) {
      this.authForm.removeControl('confirmPassword')
    } else {
      this.authForm.addControl(
        'confirmPassword',
        this.fb.control('', [Validators.required])
      )
    }
  }

  async onSubmit() {
    if (this.authForm.invalid) {
      return
    }

    const { email, password, confirmPassword } = this.authForm.value

    if (!this.isLoginMode && password !== confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }

    if (this.isLoginMode) {
      try {
        const response = await this.authService.login(email, password)
        if (response) {
          decodeAndSaveToken(response.token)
          await this.router.navigate(['/task'])
        } else {
          this.errorMessage = 'Credenciais inválidas.'
        }
      } catch (err) {
        this.errorMessage = 'Ocorreu um erro inesperado.'
      }
    } else {
      console.log('Registrando novo usuário:', { email, password })
    }
  }
}

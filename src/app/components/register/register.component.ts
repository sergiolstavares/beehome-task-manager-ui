import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SharedMaterialModule } from '../shared-material.module'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { User } from '../../models/user.model'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedMaterialModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value

      const user: User = {
        username: name,
        email,
        password
      }

      const response = await this.authService.register(user)
      if (response.email) {
        this.goToLogin()
      }
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login'])
  }
}

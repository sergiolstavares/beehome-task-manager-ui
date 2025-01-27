import { Injectable } from '@angular/core'
import { User } from '../models/user.model'
import { HttpService } from './http.service'
import { Router } from '@angular/router'
import { apiURL } from '../constants/url'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = apiURL

  constructor(private httpService: HttpService, private router: Router) {}

  async login(email: string, password: string): Promise<any> {
    return await this.httpService.request('POST', `${this.apiUrl}/auth/login`, { email, password })
  }

  async register(user: User): Promise<any> {
    return await this.httpService.request('POST', `${this.apiUrl}/users/register`, user)
  }

  async logout() {
    localStorage.removeItem('token')
    await this.router.navigate(['/login'])
  }
}

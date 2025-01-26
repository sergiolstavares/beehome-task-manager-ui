import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from '../models/user.model'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'

  constructor(private httpService: HttpService) {}

  async login(email: string, password: string): Promise<any> {
    return await this.httpService.request('POST', `${this.apiUrl}/login`, { email, password })
  }

  async register(user: User): Promise<any> {
    return await this.httpService.request('POST', `${this.apiUrl}/register`, user)
  }
}

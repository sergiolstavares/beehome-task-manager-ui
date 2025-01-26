import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { firstValueFrom, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router'
import { jwtDecode } from 'jwt-decode'

export let userId: string | null = null
export let userEmail: string | null = null

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private router: Router) { }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: any,
    params?: { [key: string]: any },
    headers?: { [key: string]: string }
  ): Promise<T | null> {
    const isPublicRoute = url.includes('/auth/login') || url.includes('/auth/register')

    const httpHeaders = isPublicRoute
      ? new HttpHeaders(headers || {})
      : new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        ...headers,
      })

    const options = {
      headers: httpHeaders,
      params: new HttpParams({ fromObject: params || {} }),
      body,
    }

    try {
      const response = await firstValueFrom(
        this.http.request<T>(method, url, options).pipe(
          catchError((error) => {
            if (error.status === 403) {
              this.router.navigate(['/auth'])
            }
            return of(null)
          })
        )
      )
      return response
    } catch (error) {
      console.error('Erro na requisição:', error)
      return null
    }
  }
}


export function decodeAndSaveToken(token: string): void {
  localStorage.setItem('token', token)
  try {
    const decoded: any = jwtDecode(token)
    userId = decoded.id || null
  } catch (error) {
    console.error('Erro ao decodificar o token JWT:', error)
    clearUserInfo()
  }
}

export function clearUserInfo(): void {
  userId = null
}

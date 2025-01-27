import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { firstValueFrom, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router'
import { jwtDecode } from 'jwt-decode'
import { ErrorHandlerService } from './error.handler.service'


@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private router: Router, private errorHandler: ErrorHandlerService) { }

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: any,
    params?: { [key: string]: any },
    headers?: { [key: string]: string }
  ): Promise<T | null> {
    const isPublicRoute = url.includes('/auth/login') || url.includes('/users/register')

    const httpHeaders = isPublicRoute
      ? new HttpHeaders(headers || {})
      : new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        ...headers
      })

    const options = {
      headers: httpHeaders,
      params: new HttpParams({ fromObject: params || {} }),
      body
    }

    try {
      const response = await firstValueFrom(
        this.http.request<T>(method, url, options).pipe(
          catchError((error) => {
            this.errorHandler.handleError(error)
            
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

export function getUserID() {
  const token = localStorage.getItem('token')

  if (token) {
    const decoded: any = jwtDecode(token)
    return decoded.id
  }

  return null
}

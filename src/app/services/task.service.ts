import { Injectable } from '@angular/core'
import { Task } from '../models/task.model'
import { HttpService } from './http.service'
import { apiURL } from '../constants/url'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${apiURL}/tasks`

  constructor(private httpService: HttpService) {}

  async listTasksByStatus(status: String): Promise<any>  {
    return await this.httpService.request("GET", `${this.apiUrl}/filter?status=${status}`)
  }

  async listTasks(page: number, size: number): Promise<any> {
    return await this.httpService.request('GET', `${this.apiUrl}?page=${page}&size=${size}`)
  }

  async getTask(id: string): Promise<any> {
    return await this.httpService.request('GET', `${this.apiUrl}/${id}`)
  }

  async addTask(task: Task): Promise<any> {
    return await this.httpService.request('POST', this.apiUrl, task)
  }

  async updateTask(task: Task): Promise<any> {
    return await this.httpService.request('PUT', `${this.apiUrl}/${task.id}`, task)
  }

  async deleteTask(id: string): Promise<any> {
    return await this.httpService.request('DELETE', `${this.apiUrl}/${id}`)
  }
}

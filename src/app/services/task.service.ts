import { Injectable } from '@angular/core'
import { Task } from '../models/task.model'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tasks'

  constructor(private httpService: HttpService) {}

  async listTasksByStatus(status: String): Promise<any>  {
    return await this.httpService.request("GET", `${this.apiUrl}/filter?status=${status}`)
  }

  async listTasks(): Promise<any> {
    return await this.httpService.request('GET', this.apiUrl)
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

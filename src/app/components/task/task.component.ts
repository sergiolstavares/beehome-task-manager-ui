import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core'
import { TaskService } from '../../services/task.service'
import { Task } from '../../models/task.model'
import { MatDialog } from '@angular/material/dialog'
import { DeleteTaskModalComponent } from './components/delete-task-modal/delete-task-modal.component'
import { AddAndEditTaskModalComponent } from './components/add-edit-task-modal/add-edit-task-modal.component'
import { SharedMaterialModule } from '../shared-material.module'
import { PageEvent } from '@angular/material/paginator'
import { getUserID } from '../../services/http.service'
import { decodeStatus } from '../../common/status'
import { humanizeDateTime } from '../../common/date'
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  imports: [SharedMaterialModule]
})
export class TaskComponent implements OnInit {
  filteredTasks: Task[] = []
  totalElements = 0
  pageSize = 10
  currentPage = 0
  selectedStatus = 'ALL'
  displayedColumns: string[] = ['title', 'description', 'status', 'createdOn', 'deadline', 'actions']

  constructor(private dialog: MatDialog, private taskService: TaskService, private authService: AuthService, private notificationService: NotificationService) {}

  async ngOnInit() {
    const tasks = await this.taskService.listTasks(this.currentPage, this.pageSize)
    this.filteredTasks = tasks.content
    this.updatePaginationInfos(tasks)
  }

  openAddTaskModal(): void {
    const dialogRef = this.dialog.open(AddAndEditTaskModalComponent)

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.addTask(data)
      }
    })
  }

  openEditTaskModal(task: any): void {
    const dialogRef = this.dialog.open(AddAndEditTaskModalComponent, {
      data: task
    })

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.editTask(data)
      }
    })
  }

  openDeleteModal(id: string, title: string): void {
    const dialogRef = this.dialog.open(DeleteTaskModalComponent, {
      data: { id, title },
    })

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.deleteTask(id)
      }
    })
  }

  async deleteTask(id: string): Promise<any> {
    await this.taskService.deleteTask(id)
    this.notificationService.showSuccess('Tarefa removida com sucesso')
    await this.listTasks()
  }

  async addTask(taskData: any): Promise<void> {
    const task: Task = {
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      status: taskData.status,
      deadline: taskData.deadline,
      assignedTo: getUserID()
    }

    if (task.assignedTo) {
      const taskCreated = await this.taskService.addTask(task)

      if (taskCreated) {
        this.notificationService.showSuccess('Tarefa criada com sucesso')
        await this.listTasks()
      }
    }
  }

  async editTask(updatedTask: any): Promise<void> {
    if (new Date(updatedTask.deadline) < new Date()) updatedTask.deadline = null

    const response = await this.taskService.updateTask(updatedTask)

    if (response.id) {
      this.notificationService.showSuccess('Tarefa atualizada com sucesso')
      await this.listTasks()
    }
  }

  async listTasks() {
    if (this.selectedStatus !== 'ALL') {
      const tasks = await this.taskService.listTasksByStatus(this.selectedStatus)
      this.filteredTasks = tasks
    } else {
      const tasksFiltered = await this.taskService.listTasks(this.currentPage, this.pageSize)
      this.filteredTasks = tasksFiltered.content
      this.updatePaginationInfos(tasksFiltered)
    }
  }

  async handleOnChangeApplyFilter(event: any) {
    this.selectedStatus = event.value

    await this.listTasks()
  }

  updatePaginationInfos(event: any) {
    this.totalElements = event.totalElements
  }

  decodeStatus(status: string) {
    return decodeStatus(status)
  }

  formatDate(date: string) {
    return humanizeDateTime(date)
  }

  async changePage(event: PageEvent) {
    this.currentPage = event.pageIndex
    this.pageSize = event.pageSize
    await this.listTasks()
  }

  async handleOnClickLogout() {
    await this.authService.logout()
  }
}

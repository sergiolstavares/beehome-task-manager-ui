import { Component, OnInit } from '@angular/core'
import { TaskService } from '../../services/task.service'
import { Task } from '../../models/task.model'
import { MatDialog } from '@angular/material/dialog'
import { DeleteTaskModalComponent } from './components/delete-task-modal/delete-task-modal.component'
import { AddAndEditTaskModalComponent } from './components/add-edit-task-modal/add-edit-task-modal.component'
import { SharedMaterialModule } from '../shared-material.module'
import { userEmail, userId } from '../../services/http.service'


@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  imports: [SharedMaterialModule]
})
export class TaskComponent implements OnInit {
  filteredTasks: Task[] = []
  selectedStatus = 'ALL'
  displayedColumns: string[] = ['title', 'description', 'status', 'createdOn', 'deadline', 'actions']

  constructor(private dialog: MatDialog, private taskService: TaskService) { }

  async ngOnInit() {
    const tasks = await this.taskService.listTasks()
    this.filteredTasks = tasks.content
  }

  openAddTaskModal(): void {
    const dialogRef = this.dialog.open(AddAndEditTaskModalComponent)

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.addTask(data)
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

    await this.listTasks()
  }

  async addTask(taskData: any): Promise<void> {
    const task: Task = {
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      status: taskData.status,
      deadline: taskData.deadline,
      assignedTo: userId as String
    }

    const taskCreated = await this.taskService.addTask(task)

    if (taskCreated) {
      await this.listTasks()
    }
  }

  async listTasks() {
    if (this.selectedStatus !== 'ALL') {
      const tasks = await this.taskService.listTasksByStatus(this.selectedStatus)
      this.filteredTasks = tasks
    } else {
      const tasksFiltered = await this.taskService.listTasks()
      this.filteredTasks = tasksFiltered.content
    }
  }

  async handleOnChangeApplyFilter(event: any) {
    this.selectedStatus = event.value

    await this.listTasks()
  }

  changePage(event: any) {
    console.log(event)
  }
}

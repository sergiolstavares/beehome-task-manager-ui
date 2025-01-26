import { Routes } from '@angular/router'
import { AuthComponent } from './components/auth/auth.component'
import { TaskComponent } from './components/task/task.component'

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'task', component: TaskComponent },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth', pathMatch: 'full' }
];

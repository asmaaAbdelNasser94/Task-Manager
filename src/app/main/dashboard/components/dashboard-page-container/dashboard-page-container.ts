import { Component, computed, input } from '@angular/core';
import { Task, TasksResponse } from '../../../../core/models/dashboard';

@Component({
  selector: 'task-manager-dashboard-page-container',
  imports: [],
  templateUrl: './dashboard-page-container.html',
  styleUrl: './dashboard-page-container.scss',
})
export class DashboardPageContainer {
  public tasks = input<Task[]>();
  public todoTasks = computed(() => this.tasks()?.filter(t => t.status === 'todo'));
  public inProgressTasks = computed(() => this.tasks()?.filter(t => t.status === 'in_progress'));
  public doneTasks = computed(() => this.tasks()?.filter(t => t.status === 'done'));
}

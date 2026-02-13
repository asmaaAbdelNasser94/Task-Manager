import { Component, computed, input } from '@angular/core';
import { Task, TasksResponse } from '../../../../core/models/dashboard';
import { TaskStatus } from '../../../../core/enums/dashboard.enum';

@Component({
  selector: 'task-manager-dashboard-page-container',
  imports: [],
  templateUrl: './dashboard-page-container.html',
  styleUrl: './dashboard-page-container.scss',
})
export class DashboardPageContainer {
  public tasks = input<Task[]>();

  // Filter tasks by status
  public todoTasks = computed(() => this.tasks()?.filter(t => t.status === TaskStatus.TODO));
  public inProgressTasks = computed(() => this.tasks()?.filter(t => t.status === TaskStatus.IN_PROGRESS));
  public doneTasks = computed(() => this.tasks()?.filter(t => t.status === TaskStatus.DONE));
}

import { Component, computed, input, output } from '@angular/core';
import { Task } from '../../../../../core/models/dashboard.model';
import { TaskStatus } from '../../../../../core/enums/dashboard.enum';
import { StatusTasksContainer } from '../status-tasks-container/status-tasks-container';

@Component({
  selector: 'task-manager-tasks-container',
  imports: [StatusTasksContainer],
  templateUrl: './tasks-container.html',
  styleUrl: './tasks-container.scss',
})
export class TasksContainer {
  private readonly allStatuses: TaskStatus[] = [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE];
  
  public onEditTask = output<Task>();
  public onDeleteTask = output<Task>();
  

  public tasks = input.required<Task[]>();
  public selectedStatus = input<TaskStatus | null>(null);

  public visibleStatuses = computed(() => {
    const status = this.selectedStatus();
    return status === null ? this.allStatuses : [status];
  });

  public getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks()?.filter(task => task.status === status) ?? [];
  }
}

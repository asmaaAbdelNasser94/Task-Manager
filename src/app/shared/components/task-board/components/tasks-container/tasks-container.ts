import { Component, input } from '@angular/core';
import { Task } from '../../../../../core/models/dashboard';
import { TaskStatus } from '../../../../../core/enums/dashboard.enum';
import { StatusTasksContainer } from "../status-tasks-container/status-tasks-container";

@Component({
  selector: 'task-manager-tasks-container',
  imports: [StatusTasksContainer],
  templateUrl: './tasks-container.html',
  styleUrl: './tasks-container.scss',
})
export class TasksContainer {
  public tasks = input<Task[]>();

  public taskStatus = TaskStatus;
  public objkeys = Object.keys;

  public getTasksByStatus(status: string) {
    if (!this.tasks()) return [];
    return this.tasks()?.filter(task => task.status === TaskStatus[status as keyof typeof TaskStatus]);
  }

}

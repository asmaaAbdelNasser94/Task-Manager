import { Component, input } from '@angular/core';
import { Task } from '../../../../../core/models/dashboard';

@Component({
  selector: 'task-manager-status-tasks-container',
  imports: [],
  templateUrl: './status-tasks-container.html',
  styleUrl: './status-tasks-container.scss',
})
export class StatusTasksContainer {
  public tasks = input<Task[]>()
  public taskStatus = input<string>()
}

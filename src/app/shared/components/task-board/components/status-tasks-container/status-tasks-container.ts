import { Component, computed, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Task } from '../../../../../core/models/dashboard';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'task-manager-status-tasks-container',
  imports: [TaskCard, TranslateModule],
  templateUrl: './status-tasks-container.html',
  styleUrl: './status-tasks-container.scss',
})
export class StatusTasksContainer {
  public tasks = input.required<Task[]>();
  public taskStatus = input.required<string>();

  public taskCount = computed(() => this.tasks()?.length ?? 0);
}

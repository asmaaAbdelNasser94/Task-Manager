import { Component, computed, inject, Signal, signal } from '@angular/core';
import { SelectButton } from 'primeng/selectbutton';
import { TaskPriority, TaskStatus } from '../../../core/enums/dashboard.enum';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { TasksContainer } from './components/tasks-container/tasks-container';
import { TasksService } from './service/tasks.service';
import { statusList } from './status-list';
import { piriortiesList } from './piriorties-list';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'task-manager-task-board',
  imports: [
    TranslateModule,
    FormsModule,
    SelectButton,
    Button,
    SplitButton,
    TasksContainer,
  ],
  templateUrl: './task-board.html',
  styleUrl: './task-board.scss',
})
export class TaskBoard {
  private _tasksService = inject(TasksService);
  private _TranslateService = inject(TranslateService);
  private allTasks = computed(() => this._tasksService.tasksResource.value()?.tasks ?? []);
  private langChange = toSignal(this._TranslateService.onLangChange);

  public selectedTaskStatus: TaskStatus | null = null;
  public selectedPriority = signal<TaskPriority | null>(null);
  public loadingTasks = computed(() => this._tasksService.tasksResource.isLoading());
  public errorTasks = computed(() => this._tasksService.tasksResource.error());

  public taskStatusOptions: Signal<{ label: string; value: TaskStatus | null }[]> = computed(() => {
    this.langChange(); // re-evaluate when language changes
    return statusList(this._TranslateService);
  })
  
  public priorityMenuItems: Signal<MenuItem[]> = computed(() => {
    this.langChange(); // re-evaluate when language changes
    return piriortiesList(this._TranslateService).map(item => ({
      label: item.label,
      value: item.value,
      command: () => this.selectedPriority.set(item.value),
    }));
  });

  public selectedPriorityLabel = computed(() => {
    const priority = this.selectedPriority();
    const menuItem = this.priorityMenuItems().find(item => item['value'] == priority);
    
    return menuItem?.label ?? (priority as string);
  });

  public filteredTasks = computed(() => {
    const tasks = this.allTasks();
    const priority = this.selectedPriority();
    if (!priority) return tasks;
    return tasks.filter(task => task.priority === priority);
  });

}

import { Component, computed, inject, signal } from '@angular/core';
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
  private _translateService = inject(TranslateService);
  private langChangeSub!: Subscription;
  private allTasks = computed(() => this._tasksService.tasksResource.value()?.tasks ?? []);

  public selectedTaskStatus: TaskStatus | null = null;
  public selectedPriority = signal<TaskPriority | null>(null);
  public taskStatusOptions: { label: string; value: TaskStatus | null }[] = [];
  public priorityMenuItems: MenuItem[] = [];

  public selectedPriorityLabel = computed(() => {
    const priority = this.selectedPriority();

    const menuItem = this.priorityMenuItems.find(item => item['value'] == priority);
    console.log(menuItem);

    return menuItem?.label ?? (priority as string);
  });

  public filteredTasks = computed(() => {
    const tasks = this.allTasks();
    const priority = this.selectedPriority();
    if (!priority) return tasks;
    return tasks.filter(task => task.priority === priority);
  });

  public loadingTasks = computed(() => this._tasksService.tasksResource.isLoading());
  public errorTasks = computed(() => this._tasksService.tasksResource.error());

  constructor() {
    this.initTaskStatus();
    this.initPriorityMenuItems();

    this.langChangeSub = this._translateService.onLangChange.subscribe(() => {
      this.initTaskStatus();
      this.initPriorityMenuItems();
    });
  }

  private initTaskStatus(): void {
    this.taskStatusOptions = statusList(this._translateService);
  }

  private initPriorityMenuItems(): void {
    this.priorityMenuItems = piriortiesList(this._translateService).map(item => ({
      label: item.label,
      command: () => this.selectedPriority.set(item.value),
    }));
  }

  ngOnDestroy(): void {
    this.langChangeSub?.unsubscribe();
  }
}

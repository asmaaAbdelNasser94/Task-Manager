import { Component, computed, inject } from '@angular/core';
import { SelectButton } from 'primeng/selectbutton';
import { TaskPriority, TaskStatus } from '../../../core/enums/dashboard.enum';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Button } from "primeng/button";
import { SplitButton } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { TasksContainer } from "./components/tasks-container/tasks-container";
import { DashboardAPIService } from '../../../main/dashboard/services/dashboardAPI.service';
import { TasksService } from './service/tasks.service';
import { statusList } from './status-list';
import { piriortiesList } from './piriorties-list';

@Component({
  selector: 'task-manager-task-board',
  imports: [
    TranslateModule,
    FormsModule,
    // prime NG
    SelectButton,
    Button,
    SplitButton,
    TasksContainer
  ],
  templateUrl: './task-board.html',
  styleUrl: './task-board.scss',
})
export class TaskBoard {
  private _TasksService = inject(TasksService);
  private _TranslateService = inject(TranslateService);
  private langChangeSub!: Subscription;

  public selectedTaskStatus: TaskStatus = TaskStatus.ALL;
  public taskStatusOptions: { label: string; value: TaskStatus }[] = [];
  public priorityMenuItems: MenuItem[] = [];

  public tasks = computed(() => this._TasksService.tasksResource.value()?.tasks ?? []);
  public loadingTasks = computed(() => this._TasksService.tasksResource.isLoading());
  public errorTasks = computed(() => this._TasksService.tasksResource.error());

  
  constructor() {
    this.initTaskStatus();
    this.initPriorityMenuItems();
    this.langChangeSub = this._TranslateService.onLangChange.subscribe(() => {
      this.initTaskStatus();
      this.initPriorityMenuItems();
    })
  }
  private initTaskStatus() {
    this.taskStatusOptions = statusList(this._TranslateService);
  }

  private initPriorityMenuItems() {
    this.priorityMenuItems = piriortiesList(this._TranslateService);
  }

  ngOnDestroy(): void {
    this.langChangeSub?.unsubscribe();
  }
}

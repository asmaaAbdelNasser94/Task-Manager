import { Component, computed, inject, input, output, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { Task } from '../../../../../core/models/dashboard.model';
import { TaskPriority, TaskStatus } from '../../../../../core/enums/dashboard.enum';
import { DateInfo } from '../../../../../core/models/tasks.model';
import { EllipsisPipe } from '../../../../pipes/ellipsis.pipe';
import { NgClass } from '@angular/common';
import { Menu } from 'primeng/menu';
import { Button } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  daysBetween,
  getCompletedDateInfo,
  getOverdueDateInfo,
  getUpcomingDateInfo,
} from './helpers/tasks.helper';
import { avatarColors } from './const/avatar-colors';

@Component({
  selector: 'task-manager-task-card',
  imports: [TranslateModule, SkeletonModule, EllipsisPipe, NgClass, Menu, Button],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  public onEdit = output<Task>();
  public onDelete = output<Task>();

  private timeOutRef: any;
  private _TranslateService = inject(TranslateService);

  public task = input.required<Task>();
  public loading = signal(true);
  public actionItems: MenuItem[] = [];

  constructor() {
    this.initActionItems();

    this._TranslateService.onLangChange
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.initActionItems());
  }
  ngOnInit(): void {
    this.timeOutRef = setTimeout(() => this.loading.set(false), 800);
  }

  public priorityClass = computed(() => {
    const priorityClassMap: Record<TaskPriority, string> = {
      [TaskPriority.HIGH]: 'priority-high',
      [TaskPriority.MEDIUM]: 'priority-medium',
      [TaskPriority.LOW]: 'priority-low',
    };
    return priorityClassMap[this.task().priority] ?? '';
  });

  public statusClass = computed(() => {
    const statusClassMap: Record<TaskStatus, string> = {
      [TaskStatus.TODO]: 'todo',
      [TaskStatus.IN_PROGRESS]: 'in-progress',
      [TaskStatus.DONE]: 'done',
    };
    return statusClassMap[this.task().status] ?? '';
  });

  public isOverdue = computed(() => !!this.task().isOverdue);

  public dateInfo = computed(() => this.computeDateInfo(this.task()));

  public firstTag = computed(() => this.task().tags?.[0] ?? '');

  public assigneeFirstName = computed(() => this.task().assignee.name.split(' ')[0]);

  // random assignee avatar background color
  public avatarColor = computed(() => {
    const colors = avatarColors;
    const hash = this.task()
      .assignee.id.split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  });

  private initActionItems() {
    this.actionItems = [
      {
        label: this._TranslateService.instant('_General.edit'),
        icon: 'pi pi-pencil',
        command: () => this.onEdit.emit(this.task()),
      },

      {
        label: this._TranslateService.instant('_General.delete'),
        icon: 'pi pi-trash',
        command: () => this.onDelete.emit(this.task()),
      },
    ];
  }

  /**
   * Computes a DateInfo object based on the task's state.
   * If the task is completed, it returns a DateInfo object containing information about the completed date.
   * If the task is overdue, it returns a DateInfo object containing information about the overdue date.
   * Otherwise, it returns a DateInfo object containing information about the upcoming due date.
   * @param {Task} task - The task to compute the date info for.
   * @returns {DateInfo} - A DateInfo object containing information about the task's date.
   */
  private computeDateInfo(task: Task): DateInfo {
    if (task.completedAt) {
      return getCompletedDateInfo(task.completedAt);
    }
    if (task.isOverdue) {
      return getOverdueDateInfo(task.dueDate);
    }
    return getUpcomingDateInfo(task.dueDate);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOutRef);
  }
}

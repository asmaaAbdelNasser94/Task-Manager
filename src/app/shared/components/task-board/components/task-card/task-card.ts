import { Component, computed, inject, input, signal } from '@angular/core';
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

@Component({
  selector: 'task-manager-task-card',
  imports: [TranslateModule, SkeletonModule, EllipsisPipe, NgClass, Menu, Button],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
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
    const colors = [
      '#1976D2',
      '#388E3C',
      '#F57C00',
      '#7B1FA2',
      '#00796B',
      '#C2185B',
      '#5D4037',
      '#D32F2F',
    ];
    const hash = this.task()
      .assignee.id.split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  });

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
      return this.getCompletedDateInfo(task.completedAt);
    }
    if (task.isOverdue) {
      return this.getOverdueDateInfo(task.dueDate);
    }
    return this.getUpcomingDateInfo(task.dueDate);
  }

  /**
   * Returns a DateInfo object containing information about the completed date.
   * The returned object contains information about the key to translate, params to pass to the translation, icon to display and CSS class to apply.
   * @param {string} completedAt - The completed date of the task as a string in the format 'YYYY-MM-DD'.
   * @returns {DateInfo} - A DateInfo object containing information about the completed date.
   */
  private getCompletedDateInfo(completedAt: string): DateInfo {
    const days = this.daysBetween(new Date(), new Date(completedAt));
    if (days === 0)
      return {
        key: '_Shared.tasks.date.completedToday',
        params: {},
        icon: 'pi pi-check-circle',
        cssClass: 'completed',
      };
    if (days === 1)
      return {
        key: '_Shared.tasks.date.completedYesterday',
        params: {},
        icon: 'pi pi-check-circle',
        cssClass: 'completed',
      };
    return {
      key: '_Shared.tasks.date.completedDaysAgo',
      params: { days },
      icon: 'pi pi-check-circle',
      cssClass: 'completed',
    };
  }

  private getOverdueDateInfo(dueDate: string): DateInfo {
    const days = this.daysBetween(new Date(), new Date(dueDate));
    return {
      key: '_Shared.tasks.date.overdueBy',
      params: { days },
      icon: 'pi pi-exclamation-triangle',
      cssClass: 'overdue',
    };
  }

  /**
   * Returns a DateInfo object containing information about the upcoming due date.
   * @param {string} dueDate - The due date of the task as a string in the format 'YYYY-MM-DD'.
   * @returns {DateInfo} - A DateInfo object containing information about the upcoming due date.
   */
  private getUpcomingDateInfo(dueDate: string): DateInfo {
    const days = this.daysBetween(new Date(dueDate), new Date());

    if (days <= 0)
      return {
        key: '_Shared.tasks.date.dueToday',
        params: {},
        icon: 'pi pi-calendar',
        cssClass: 'due-today',
      };
    if (days === 1)
      return {
        key: '_Shared.tasks.date.dueTomorrow',
        params: {},
        icon: 'pi pi-calendar',
        cssClass: 'due-soon',
      };
    if (days <= 6)
      return {
        key: '_Shared.tasks.date.dueInDays',
        params: { days },
        icon: 'pi pi-calendar',
        cssClass: 'due-upcoming',
      };
    if (days <= 13)
      return {
        key: '_Shared.tasks.date.dueInWeek',
        params: {},
        icon: 'pi pi-calendar',
        cssClass: '',
      };
    return {
      key: '_Shared.tasks.date.dueInWeeks',
      params: { weeks: Math.floor(days / 7) },
      icon: 'pi pi-calendar',
      cssClass: '',
    };
  }

  /**
   * Calculates the number of days between two dates.
   * @param {Date} later - The later date
   * @param {Date} earlier - The earlier date
   * @returns {number} - The number of days between the two dates
   */
  private daysBetween(later: Date, earlier: Date): number {
    const l = new Date(later);
    l.setHours(0, 0, 0, 0);
    const e = new Date(earlier);
    e.setHours(0, 0, 0, 0);
    return Math.floor((l.getTime() - e.getTime()) / (1000 * 60 * 60 * 24));
  }

  private initActionItems() {
    this.actionItems = [
      {
        label: this._TranslateService.instant('_General.edit'),
        icon: 'pi pi-pencil',
        command: () => {},
      },

      {
        label: this._TranslateService.instant('_General.delete'),
        icon: 'pi pi-trash',
        iconClass: 'icon-danger',
        styleClass: 'text-danger no-border', // to remove border
        command: () => {},
      },
    ];
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOutRef);
  }
}

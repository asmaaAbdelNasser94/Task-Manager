import { Component, computed, input, Signal, signal, WritableSignal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { Task } from '../../../../../core/models/dashboard';
import { TaskPriority, TaskStatus } from '../../../../../core/enums/dashboard.enum';
import { DateInfo } from '../../../../../core/models/tasks';
import { EllipsisPipe } from '../../../../../core/pipes/ellipsis.pipe';
import { NgClass } from '@angular/common';


@Component({
  selector: 'task-manager-task-card',
  imports: [
    TranslateModule,
    SkeletonModule,
    EllipsisPipe,
    NgClass
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  public task = input.required<Task>();
  public loading = signal(true);

  private timeOutRef: any;

  ngOnInit(): void {
    this.timeOutRef = setTimeout(() => this.loading.set(false), 800);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOutRef);
  }

  public isOverdue = computed(() => !!this.task().isOverdue);

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

  public dateInfo = computed(() => this.computeDateInfo(this.task()));

  public firstTag = computed(() => this.task().tags?.[0] ?? '');

  public assigneeFirstName = computed(() => this.task().assignee.name.split(' ')[0]);

  // random assignee avatar background color
  public avatarColor = computed(() => {
    const colors = ['#1976D2', '#388E3C', '#F57C00', '#7B1FA2', '#00796B', '#C2185B', '#5D4037', '#D32F2F'];
    const hash = this.task().assignee.id
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  });

  private computeDateInfo(task: Task): DateInfo {
    if (task.completedAt) {
      return this.getCompletedDateInfo(task.completedAt);
    }
    if (task.isOverdue) {
      return this.getOverdueDateInfo(task.dueDate);
    }
    return this.getUpcomingDateInfo(task.dueDate);
  }

  private getCompletedDateInfo(completedAt: string): DateInfo {
    const days = this.daysBetween(new Date(), new Date(completedAt));
    if (days === 0) return { key: '_Shared.tasks.date.completedToday', params: {}, icon: 'pi pi-check-circle', cssClass: 'completed' };
    if (days === 1) return { key: '_Shared.tasks.date.completedYesterday', params: {}, icon: 'pi pi-check-circle', cssClass: 'completed' };
    return { key: '_Shared.tasks.date.completedDaysAgo', params: { days }, icon: 'pi pi-check-circle', cssClass: 'completed' };
  }

  private getOverdueDateInfo(dueDate: string): DateInfo {
    const days = this.daysBetween(new Date(), new Date(dueDate));
    return { key: '_Shared.tasks.date.overdueBy', params: { days }, icon: 'pi pi-exclamation-triangle', cssClass: 'overdue' };
  }

  private getUpcomingDateInfo(dueDate: string): DateInfo {
    const days = this.daysBetween(new Date(dueDate), new Date());

    if (days <= 0) return { key: '_Shared.tasks.date.dueToday', params: {}, icon: 'pi pi-calendar', cssClass: 'due-today' };
    if (days === 1) return { key: '_Shared.tasks.date.dueTomorrow', params: {}, icon: 'pi pi-calendar', cssClass: 'due-soon' };
    if (days <= 6) return { key: '_Shared.tasks.date.dueInDays', params: { days }, icon: 'pi pi-calendar', cssClass: 'due-upcoming' };
    if (days <= 13) return { key: '_Shared.tasks.date.dueInWeek', params: {}, icon: 'pi pi-calendar', cssClass: '' };
    return { key: '_Shared.tasks.date.dueInWeeks', params: { weeks: Math.floor(days / 7) }, icon: 'pi pi-calendar', cssClass: '' };
  }

  private daysBetween(later: Date, earlier: Date): number {
    const l = new Date(later); l.setHours(0, 0, 0, 0);
    const e = new Date(earlier); e.setHours(0, 0, 0, 0);
    return Math.floor((l.getTime() - e.getTime()) / (1000 * 60 * 60 * 24));
  }
}

import { TaskStatus } from '../../../../../../core/enums/dashboard.enum';
import { DateInfo } from '../../../../../../core/models/tasks.model';

/**
 * Returns a DateInfo object containing information about the upcoming due date.
 * @param {string} dueDate - The due date of the task as a string in the format 'YYYY-MM-DD'.
 * @returns {DateInfo} - A DateInfo object containing information about the upcoming due date.
 */
export function getUpcomingDateInfo(dueDate: string): DateInfo {
  const days = daysBetween(new Date(dueDate), new Date());

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
export function daysBetween(later: Date, earlier: Date): number {
  const l = new Date(later);
  l.setHours(0, 0, 0, 0);
  const e = new Date(earlier);
  e.setHours(0, 0, 0, 0);
  return Math.floor((l.getTime() - e.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Returns a DateInfo object containing information about the completed date.
 * The returned object contains information about the key to translate, params to pass to the translation, icon to display and CSS class to apply.
 * @param {string} completedAt - The completed date of the task as a string in the format 'YYYY-MM-DD'.
 * @returns {DateInfo} - A DateInfo object containing information about the completed date.
 */
export function getCompletedDateInfo(completedAt: string): DateInfo {
  const days = daysBetween(new Date(), new Date(completedAt));
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

/**
 * Returns a DateInfo object containing information about the overdue date.
 * The returned object contains information about the key to translate, params to pass to the translation, icon to display and CSS class to apply.
 * @param {string} dueDate - The due date of the task as a string in the format 'YYYY-MM-DD'.
 * @returns {DateInfo} - A DateInfo object containing information about the overdue date.
 */
export function getOverdueDateInfo(dueDate: string): DateInfo {
  const days = daysBetween(new Date(), new Date(dueDate));
  return {
    key: '_Shared.tasks.date.overdueBy',
    params: { days },
    icon: 'pi pi-exclamation-triangle',
    cssClass: 'overdue',
  };

  
}

/** Check if a due date is overdue (only for non-done tasks) */
export function checkOverdue(dueDate: string, status?: TaskStatus): boolean {
  if (!dueDate || status === TaskStatus.DONE) return false;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  return due < now;
}

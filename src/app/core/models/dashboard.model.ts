import { ChangeType, TaskPriority, TaskStatus } from '../enums/dashboard.enum';

export interface Statistic {
  id: string;
  title: string;
  icon: string;
  value: number;
  change: string;
  changeLabel: string;
  changeType: ChangeType;
  color: string;
}

export interface StatisticsResponse {
  statistics: Statistic[];
  lastUpdated: string;
}

interface Assignee {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  isOverdue: boolean;
  completedAt: string;
  assignee: Assignee;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  tasks: Task[];
  meta: {
    totalCount: number;
    lastUpdated: string;
  };
}

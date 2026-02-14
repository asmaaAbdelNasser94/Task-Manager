import { computed, effect, Injectable, signal } from '@angular/core';
import { Task, TasksResponse } from '../../../../core/models/dashboard.model';
import { httpResource } from '@angular/common/http';
import { TaskStatus } from '../../../../core/enums/dashboard.enum';
import { checkOverdue } from '../components/task-card/helpers/tasks.helper';

const TASKS_RESOURCE = 'assets/data/tasks.json';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasksResource = httpResource<TasksResponse>(() => TASKS_RESOURCE);

  /** Writable in-memory task list seeded from the HTTP resource */
  private _tasks = signal<Task[]>([]);
  private _seeded = false;

  public tasks = this._tasks.asReadonly();

  constructor() {
    // Seed the writable signal once the HTTP resource resolves
    effect(() => {
      const response = this.tasksResource.value();
      if (response?.tasks && !this._seeded) {
        this._tasks.set([...response.tasks]);
        this._seeded = true;
      }
    });
  }

  /** Whether the initial data has loaded */
  public isLoaded = computed(() => this._seeded && !this.tasksResource.isLoading());

  /** Add a new task */
  public addTask(formValue: Partial<Task>): Task {
    const now = new Date();
    const tasks = this._tasks();

    const newTask: Task = {
      id: `task-${String(tasks.length + 1).padStart(3, '0')}-${Date.now()}`,
      title: formValue.title ?? '',
      description: formValue.description ?? '',
      status: formValue.status ?? TaskStatus.TODO,
      priority: formValue.priority!,
      dueDate: formValue.dueDate ?? '',
      isOverdue: checkOverdue(formValue.dueDate ?? '', formValue.status),
      completedAt: formValue.status === TaskStatus.DONE ? now.toISOString() : '',
      assignee: formValue.assignee!,
      tags: formValue.tags
        ? Array.isArray(formValue.tags)
          ? formValue.tags
          : [formValue.tags]
        : [],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    this._tasks.set([newTask, ...tasks]);
    return newTask;
  }

  /** Update an existing task by id */
  public updateTask(id: string, formValue: Partial<Task>): Task | null {
    const now = new Date();
    const tasks = this._tasks();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;

    const existing = tasks[index];
    const updatedTask: Task = {
      ...existing,
      title: formValue.title ?? existing.title,
      description: formValue.description ?? existing.description,
      status: formValue.status ?? existing.status,
      priority: formValue.priority ?? existing.priority,
      dueDate: formValue.dueDate ?? existing.dueDate,
      assignee: formValue.assignee ?? existing.assignee,
      tags: formValue.tags
        ? Array.isArray(formValue.tags)
          ? formValue.tags
          : [formValue.tags]
        : existing.tags,
      isOverdue: checkOverdue(
        formValue.dueDate ?? existing.dueDate,
        formValue.status ?? existing.status,
      ),
      completedAt:
        (formValue.status ?? existing.status) === TaskStatus.DONE
          ? existing.completedAt || now.toISOString()
          : '',
      updatedAt: now.toISOString(),
    };

    const updated = [...tasks];
    updated[index] = updatedTask;
    this._tasks.set(updated);
    return updatedTask;
  }

  /** Delete a task by id */
  public deleteTask(id: string): boolean {
    const tasks = this._tasks();
    const filtered = tasks.filter((t) => t.id !== id);
    if (filtered.length === tasks.length) return false;
    this._tasks.set(filtered);
    return true;
  }
}

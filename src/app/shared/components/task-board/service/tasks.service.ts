import { Injectable } from '@angular/core';
import { TasksResponse } from '../../../../core/models/dashboard.model';
import { httpResource } from '@angular/common/http';

const TASKS_RESOURCE = 'assets/data/tasks.json';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasksResource = httpResource<TasksResponse>(() => TASKS_RESOURCE);
}

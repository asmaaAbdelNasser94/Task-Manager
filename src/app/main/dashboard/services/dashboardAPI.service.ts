import { computed, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatisticsResponse, TasksResponse } from '../../../core/models/dashboard';

const STATISTICS_RESOURCE = 'assets/data/statistics.json';
const TASKS_RESOURCE = 'assets/data/tasks.json';

@Injectable({
  providedIn: 'root',
})

export class DashboardAPIService {
  public tasksResource = httpResource<TasksResponse>(() => TASKS_RESOURCE);
  public statisticsResource = httpResource<StatisticsResponse>(() => STATISTICS_RESOURCE);
}

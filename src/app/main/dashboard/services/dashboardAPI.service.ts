import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { StatisticsResponse } from '../../../core/models/dashboard.model';

const STATISTICS_RESOURCE = 'assets/data/statistics.json';

@Injectable({
  providedIn: 'root',
})
export class DashboardAPIService {
  public statisticsResource = httpResource<StatisticsResponse>(() => STATISTICS_RESOURCE);
}

import { Component, computed, effect, inject } from '@angular/core';
import { DashboardPageContainer } from "../../components/dashboard-page-container/dashboard-page-container";
import { DashboardAPIService } from '../../services/dashboardAPI.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'task-manager-dashboard-page',
  imports: [DashboardPageContainer, CardModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  private _DashboardAPIService = inject(DashboardAPIService);

  public statistics = computed(() => this._DashboardAPIService.statisticsResource.value()?.statistics ?? []);
  public tasks = computed(() => this._DashboardAPIService.tasksResource.value()?.tasks ?? []);

  public loadingTasks = computed(() => this._DashboardAPIService.tasksResource.isLoading());
  public errorTasks = computed(() => this._DashboardAPIService.tasksResource.error());

  public loadingStatistics = computed(() => this._DashboardAPIService.statisticsResource.isLoading());
  public errorStatistics = computed(() => this._DashboardAPIService.statisticsResource.error());
}

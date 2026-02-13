import { Component, computed, inject } from '@angular/core';
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
  public loadingStatistics = computed(() => this._DashboardAPIService.statisticsResource.isLoading());
  public errorStatistics = computed(() => this._DashboardAPIService.statisticsResource.error());
}

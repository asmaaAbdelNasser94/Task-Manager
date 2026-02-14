import { Component, computed, inject } from '@angular/core';
import { DashboardPageContainer } from "../../components/dashboard-page-container/dashboard-page-container";
import { DashboardAPIService } from '../../services/dashboardAPI.service';
import { CardModule } from 'primeng/card';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'task-manager-dashboard-page',
  imports: [DashboardPageContainer, CardModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  private _DashboardAPIService = inject(DashboardAPIService);
  private _TranslateService = inject(TranslateService);
  private _Title = inject(Title);
  constructor() {
    this._Title.setTitle(this._TranslateService.instant('_Layout.sideNav.dashboard'));

    this._TranslateService.onLangChange.pipe(takeUntilDestroyed()). subscribe(() => this._Title.setTitle(this._TranslateService.instant('_Layout.sideNav.dashboard')));
  }
  public statistics = computed(() => this._DashboardAPIService.statisticsResource.value()?.statistics ?? []);
  public loadingStatistics = computed(() => this._DashboardAPIService.statisticsResource.isLoading());
  public errorStatistics = computed(() => this._DashboardAPIService.statisticsResource.error());
}

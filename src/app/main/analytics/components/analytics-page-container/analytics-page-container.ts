import { ChangeDetectorRef, Component, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DashboardAPIService } from '../../../dashboard/services/dashboardAPI.service';
import { Card } from "primeng/card";
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'task-manager-analytics-page-container',
  imports: [
    TranslateModule,

    Card,
    ChartModule
  ],
  templateUrl: './analytics-page-container.html',
  styleUrl: './analytics-page-container.scss',
})
export class AnalyticsPageContainer {
  private _TranslateService = inject(TranslateService);
  private _DashboardAPIService = inject(DashboardAPIService);
  private platformId = inject(PLATFORM_ID);
  private cd = inject(ChangeDetectorRef);
  private langChange = toSignal(this._TranslateService.onLangChange);

  private colors = computed(() => this._DashboardAPIService.statisticsResource.value()?.statistics.map((item) => item.color));
  private values = computed(() => this._DashboardAPIService.statisticsResource.value()?.statistics.map((item) => item.value));
  private labels = computed(() => {
    this.langChange(); // re-evaluate when language changes
    return this._DashboardAPIService.statisticsResource.value()?.statistics.map((item) => this._TranslateService.instant(item.title));
  });

  data: any;
  options: any;
  constructor() {
    effect(() => this.initChart());
  }


  private initChart() {
    if (isPlatformBrowser(this.platformId)) {

      this.data = {
        labels: this.labels(),
        datasets: [
          {
            data: this.values(),
            backgroundColor: this.colors(),
            hoverBackgroundColor: this.colors()
          }
        ]
      };

      this.options = {
        cutout: '65%',
        plugins: {
          legend: {
            display: true,
            labels: {
              usePointStyle: true,
              color: '#363636',
              padding: 16,
              font: {
                size: 14,
                family: 'cairo'
              }
            },
            position: 'bottom'
          },
        }
      };
      this.cd.markForCheck();
    }
  }
}

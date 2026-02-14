import { Component, inject } from '@angular/core';
import { AnalyticsPageContainer } from "../../components/analytics-page-container/analytics-page-container";
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'task-manager-analytics-page',
  imports: [AnalyticsPageContainer],
  templateUrl: './analytics-page.html',
  styleUrl: './analytics-page.scss',
})
export class AnalyticsPage {
  private _TranslateService = inject(TranslateService);
  private _Title = inject(Title);
  constructor() {
    this._Title.setTitle(this._TranslateService.instant('_Layout.sideNav.analytics'));
    this._TranslateService.onLangChange.pipe(takeUntilDestroyed()).subscribe(() => this._Title.setTitle(this._TranslateService.instant('_Layout.sideNav.analytics')));
  }
}

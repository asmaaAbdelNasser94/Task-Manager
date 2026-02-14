import { Component, inject } from '@angular/core';
import { TasksPageContainer } from "../../components/tasks-page-container/tasks-page-container";
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'task-manager-tasks-page',
  imports: [TasksPageContainer],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
})
export class TasksPage {
  private _TranslateService = inject(TranslateService);
  private _Title = inject(Title);
  constructor() {
    this._Title.setTitle(this._TranslateService.instant('_Layout.sideNav.tasks'));
    this._TranslateService.onLangChange.pipe(takeUntilDestroyed()). subscribe(() => this._Title.setTitle(this._TranslateService.instant('_Layout.sideNav.tasks')));
  }
}

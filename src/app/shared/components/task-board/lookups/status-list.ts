import { TranslateService } from '@ngx-translate/core';
import { TaskStatus } from '../../../../core/enums/dashboard.enum';
export function statusList(_TranslateService: TranslateService) {
  return [
    {
      label: _TranslateService.instant('_Shared.tasks.status.all'),
      value: null,
    },
    {
      label: _TranslateService.instant('_Shared.tasks.status.' + TaskStatus.TODO),
      value: TaskStatus.TODO,
    },
    {
      label: _TranslateService.instant('_Shared.tasks.status.' + TaskStatus.IN_PROGRESS),
      value: TaskStatus.IN_PROGRESS,
    },
    {
      label: _TranslateService.instant('_Shared.tasks.status.' + TaskStatus.DONE),
      value: TaskStatus.DONE,
    },
  ];
}

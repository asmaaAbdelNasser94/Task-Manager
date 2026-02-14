import { TranslateService } from '@ngx-translate/core';
import { TaskPriority } from '../../../../core/enums/dashboard.enum';

export function piriortiesList(_TranslateService: TranslateService) {
  return [
    {
      label: _TranslateService.instant('_Shared.tasks.priority.all'),
      value: null,
    },
    {
      label: _TranslateService.instant('_Shared.tasks.priority.' + TaskPriority.HIGH),
      value: TaskPriority.HIGH,
    },
    {
      label: _TranslateService.instant('_Shared.tasks.priority.' + TaskPriority.MEDIUM),
      value: TaskPriority.MEDIUM,
    },
    {
      label: _TranslateService.instant('_Shared.tasks.priority.' + TaskPriority.LOW),
      value: TaskPriority.LOW,
    },
  ];
}

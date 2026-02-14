import { TranslateService } from '@ngx-translate/core';
import { DynamicFieldConfig } from '../../../core/models/dynamic-form-field.model';
import { FieldType } from '../../../core/enums/dynamic-form-field.enum';
import { piriortiesList } from '../task-board/lookups/piriorties-list';
import { statusList } from '../task-board/lookups/status-list';
import { assigneeList } from './const/assignee-list';
import { tagsList } from './const/tags-list';
import { Validators } from '@angular/forms';

export function addEditTaskFormList(_TranslateService: TranslateService): DynamicFieldConfig[] {
  return [
    {
      formControlName: 'title',
      label: _TranslateService.instant('_Shared.tasks.addEdit.title'),
      type: FieldType.TEXT,
      placeholder: _TranslateService.instant('_Shared.tasks.addEdit.titlePlaceholder'),
      required: true,
      validators: [Validators.required],
    },
    {
      formControlName: 'description',
      label: _TranslateService.instant('_Shared.tasks.addEdit.description'),
      type: FieldType.TEXTAREA,
      placeholder: _TranslateService.instant('_Shared.tasks.addEdit.descriptionPlaceholder'),
      required: true,
      validators: [Validators.required],
    },
    {
      formControlName: 'priority',
      label: _TranslateService.instant('_Shared.tasks.addEdit.priority'),
      placeholder: _TranslateService.instant('_Shared.tasks.addEdit.priorityPlaceholder'),
      type: FieldType.SELECT,
      options: piriortiesList(_TranslateService).slice(1),
      optionLabel: 'label',
      optionValue: 'value',
      required: true,
      validators: [Validators.required],
    },
    {
      formControlName: 'status',
      label: _TranslateService.instant('_Shared.tasks.addEdit.status'),
      placeholder: _TranslateService.instant('_Shared.tasks.addEdit.statusPlaceholder'),
      type: FieldType.SELECT,
      options: statusList(_TranslateService).slice(1),
      optionLabel: 'label',
      optionValue: 'value',
      required: true,
      validators: [Validators.required],
    },
    {
      formControlName: 'dueDate',
      label: _TranslateService.instant('_Shared.tasks.addEdit.dueDate'),
      placeholder: _TranslateService.instant('_Shared.tasks.addEdit.dueDatePlaceholder'),
      type: FieldType.DATE,
      required: true,
      validators: [Validators.required],
    },
    {
      formControlName: 'assignee',
      label: _TranslateService.instant('_Shared.tasks.addEdit.assignee'),
      placeholder: _TranslateService.instant('_Shared.tasks.addEdit.assigneePlaceholder'),
      type: FieldType.SELECT,
      options: assigneeList,
      optionLabel: 'name',
      required: true,
      validators: [Validators.required],
    },
    {
      formControlName: 'tags',
      label: _TranslateService.instant('_Shared.tasks.addEdit.tag'),
      placeholder: _TranslateService.instant('_Shared.tasks.addEdit.tagPlaceholder'),
      type: FieldType.SELECT,
      options: tagsList,
      optionLabel: 'name',
      optionValue: 'name',
      required: true,
      validators: [Validators.required],
    },
  ];
}

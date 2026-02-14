import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addEditTaskFormList } from './add-edit-task-form-list';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'task-manager-add-edit-task-form',
  imports: [ReactiveFormsModule, DynamicFormField, TranslateModule],
  templateUrl: './add-edit-task-form.html',
  styleUrl: './add-edit-task-form.scss',
})
export class AddEditTaskForm {
  @Output() onCancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private _TranslateService = inject(TranslateService);
  private langChange = toSignal(this._TranslateService.onLangChange);

  public formGroup = this.fb.group({});

  public formGroupList = computed(() => {
    if (!this.formGroup) return [];
    this.langChange();
    return addEditTaskFormList(this._TranslateService);
  });

  ngOnInit(): void {
    this.initFormGroup();
  }

  submit() {
    console.log(this.formGroup.value);
  }
  public initFormGroup() {
    this.formGroupList().forEach((field) =>
      this.formGroup.addControl(
        field.formControlName,
        new FormControl(
          { value: field['initialValue'] ?? null, disabled: field['disabled'] },
          field.validators,
        ),
      ),
    );
  }
}

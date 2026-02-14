import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { addEditTaskFormList } from './add-edit-task-form-list';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task } from '../../../core/models/dashboard.model';

@Component({
  selector: 'task-manager-add-edit-task-form',
  imports: [ReactiveFormsModule, DynamicFormField, TranslateModule],
  templateUrl: './add-edit-task-form.html',
  styleUrl: './add-edit-task-form.scss',
})
export class AddEditTaskForm {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<Partial<Task>>();

  public editingTask: Task | null = null;

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

  get isEditMode(): boolean {
    return this.editingTask !== null;
  }

  public submit() {
    if (this.formGroup.invalid) return;

    const formValue = this.formGroup.getRawValue() as Record<string, any>;

    // Normalize the dueDate — handle both string and Date object from date picker
    const rawDate = formValue['dueDate'];
    let dueDate = '';
    if (rawDate instanceof Date) {
      dueDate = rawDate.toISOString().split('T')[0];
    } else if (typeof rawDate === 'string') {
      dueDate = rawDate;
    }

    const taskData: Partial<Task> = {
      title: formValue['title'],
      description: formValue['description'],
      status: formValue['status'],
      priority: formValue['priority'],
      dueDate,
      assignee: formValue['assignee'],
      tags: formValue['tags'],
    };

    this.onSubmit.emit(taskData);
  }

  /** Populate the form for editing an existing task */
  public patchFormValues(task: Task): void {
    this.editingTask = task;
    this.formGroup.patchValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      assignee: task.assignee,
      tags: task.tags?.[0] ?? null,
    });
  }

  /** Reset the form back to add mode */
  public resetForm(): void {
    this.editingTask = null;
    this.formGroup.reset();
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

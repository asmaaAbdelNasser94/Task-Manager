import { Component, computed, inject, Signal, signal, ViewChild } from '@angular/core';
import { SelectButton } from 'primeng/selectbutton';
import { TaskPriority, TaskStatus } from '../../../core/enums/dashboard.enum';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { TasksContainer } from './components/tasks-container/tasks-container';
import { TasksService } from './service/tasks.service';
import { statusList } from './lookups/status-list';
import { piriortiesList } from './lookups/piriorties-list';
import { toSignal } from '@angular/core/rxjs-interop';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { AddEditTaskForm } from '../add-edit-task-form/add-edit-task-form';
import { Task } from '../../../core/models/dashboard.model';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'task-manager-task-board',
  imports: [
    TranslateModule,
    FormsModule,
    SelectButton,
    Button,
    SplitButton,
    TasksContainer,
    Dialog,
    ConfirmDialog,
    AddEditTaskForm,
    Tooltip
  ],
  templateUrl: './task-board.html',
  styleUrl: './task-board.scss',
})
export class TaskBoard {
  @ViewChild('addEditTaskForm') addEditTaskForm!: AddEditTaskForm;

  private _tasksService = inject(TasksService);
  private _TranslateService = inject(TranslateService);
  private _confirmationService = inject(ConfirmationService);
  private langChange = toSignal(this._TranslateService.onLangChange);

  public selectedTaskStatus: TaskStatus | null = null;
  public selectedPriority = signal<TaskPriority | null>(null);
  public loadingTasks = computed(() => this._tasksService.tasksResource.isLoading());
  public errorTasks = computed(() => this._tasksService.tasksResource.error());
  public showAddEditTaskFormDialog: boolean = false;

  public taskStatusOptions: Signal<{ label: string; value: TaskStatus | null }[]> = computed(() => {
    this.langChange(); // re-evaluate when language changes
    return statusList(this._TranslateService);
  });

  public priorityMenuItems: Signal<MenuItem[]> = computed(() => {
    this.langChange(); // re-evaluate when language changes
    return piriortiesList(this._TranslateService).map((item) => ({
      label: item.label,
      value: item.value,
      command: () => this.selectedPriority.set(item.value),
    }));
  });

  public selectedPriorityLabel = computed(() => {
    const priority = this.selectedPriority();
    const menuItem = this.priorityMenuItems().find((item) => item['value'] == priority);

    return menuItem?.label ?? (priority as string);
  });

  /** Dialog header changes based on add/edit mode */
  public dialogHeaderKey = computed(() =>
    this.addEditTaskForm?.isEditMode ? '_Shared.tasks.editTask' : '_Shared.tasks.addTask',
  );

  /** Use the writable tasks signal from the service */
  public filteredTasks = computed(() => {
    const tasks = this._tasksService.tasks();
    const priority = this.selectedPriority();
    if (!priority) return tasks;
    return tasks.filter((task) => task.priority === priority);
  });

  public submit = () => this.addEditTaskForm.submit();

  /** Open dialog in add mode */
  openAddDialog(): void {
    this.addEditTaskForm?.resetForm();
    this.showAddEditTaskFormDialog = true;
  }

  /** Open dialog in edit mode, pre-filled with task data */
  openEditDialog(task: Task): void {
    this.showAddEditTaskFormDialog = true;

    // Use setTimeout to ensure the ViewChild is available after dialog opens
    setTimeout(() => {
      this.addEditTaskForm?.patchFormValues(task);
    });
  }

  /** Handle form submission for both add and edit */
  handleFormSubmit(taskData: Partial<Task>): void {
    if (this.addEditTaskForm?.isEditMode) {
      const editingId = this.addEditTaskForm.editingTask!.id;
      this._tasksService.updateTask(editingId, taskData);
    } else {
      this._tasksService.addTask(taskData);
    }

    this.showAddEditTaskFormDialog = false;
    this.addEditTaskForm?.resetForm();
  }

  /** Handle task deletion with confirmation dialog */
  handleDeleteTask(task: Task): void {
    this._confirmationService.confirm({
      header: this._TranslateService.instant('_General.confirmDelete'),
      message: this._TranslateService.instant('_General.confirmDeleteMessage'),
      icon: 'pi pi-trash',
      acceptLabel: this._TranslateService.instant('_General.yes'),
      rejectLabel: this._TranslateService.instant('_General.no'),
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',
      accept: () => {
        this._tasksService.deleteTask(task.id);
      },
    });
  }

  /** Handle dialog close / cancel */
  onDialogHide(): void {
    this.addEditTaskForm?.resetForm();
  }
}

import { Component, inject, computed, Signal, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Button } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { sideMenuItems } from './side-nav-menu-items';
import { toSignal } from '@angular/core/rxjs-interop';
import { Dialog } from 'primeng/dialog';
import { AddEditTaskForm } from '../../shared/components/add-edit-task-form/add-edit-task-form';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'task-manager-side-nav',
  imports: [TranslateModule, PanelMenuModule, Button, Dialog, AddEditTaskForm, Tooltip],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  @ViewChild('addEditTaskForm') addEditTaskForm!: AddEditTaskForm;

  private _TranslateService = inject(TranslateService);
  private langChange = toSignal(this._TranslateService.onLangChange);

  public showAddEditTaskFormDialog: boolean = false;

  public sideMenuItems: Signal<MenuItem[]> = computed(() => {
    this.langChange(); // re-evaluate when language changes
    return sideMenuItems(this._TranslateService);
  });

  public submit = () => this.addEditTaskForm.submit();
}

import { Component, inject, computed, Signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { sideMenuItems } from './side-nav-menu-items';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'task-manager-side-nav',
  imports: [
    TranslateModule,
    PanelMenuModule,
    ButtonModule
  ],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  private _TranslateService = inject(TranslateService);
  private langChange = toSignal(this._TranslateService.onLangChange);

  public sideMenuItems: Signal<MenuItem[]> = computed(() => {
    this.langChange(); // re-evaluate when language changes
    return sideMenuItems(this._TranslateService);
  });
}

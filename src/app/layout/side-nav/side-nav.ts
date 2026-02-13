import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { sideMenuItems } from './side-nav-menu-items';

@Component({
  selector: 'task-manager-side-nav',
  imports: [TranslateModule, PanelMenuModule, ButtonModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav implements OnInit, OnDestroy {
  private _TranslateService = inject(TranslateService);
  private langChangeSub!: Subscription;

  public sideMenuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.sideMenuItems = sideMenuItems(this._TranslateService);

    this.langChangeSub = this._TranslateService.onLangChange.subscribe(() => {
      this.sideMenuItems = sideMenuItems(this._TranslateService);
    });
  }

  ngOnDestroy(): void {
    this.langChangeSub?.unsubscribe();
  }
}

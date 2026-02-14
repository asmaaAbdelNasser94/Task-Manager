import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

export function sideMenuItems(_TranslateService: TranslateService): MenuItem[] {
  return [
    {
      label: _TranslateService.instant('_Layout.sideNav.dashboard'),
      badge: '📊',
      routerLink: ['/dashboard'],
      routerLinkActiveOptions: { exact: true }, // Only active for exact match to avoid multiple active states
      tooltip: _TranslateService.instant('_Layout.sideNav.dashboard'),
      tooltipOptions: { tooltipStyleClass: 'mobile-tooltip' },
    },
    {
      label: _TranslateService.instant('_Layout.sideNav.tasks'),
      badge: '✅',
      routerLink: ['/tasks'],
      tooltip: _TranslateService.instant('_Layout.sideNav.tasks'),
      tooltipOptions: { tooltipStyleClass: 'mobile-tooltip' },
    },
    {
      label: _TranslateService.instant('_Layout.sideNav.analytics'),
      badge: '📈',
      routerLink: ['/analytics'],
      tooltip: _TranslateService.instant('_Layout.sideNav.analytics'),
      tooltipOptions: { tooltipStyleClass: 'mobile-tooltip' },
    },
    {
      label: _TranslateService.instant('_Layout.sideNav.calendar'),
      badge: '📅',
      routerLink: ['/calendar'],
      tooltip: _TranslateService.instant('_Layout.sideNav.calendar'),
      tooltipOptions: { tooltipStyleClass: 'mobile-tooltip' },
    },
    {
      label: _TranslateService.instant('_Layout.sideNav.team'),
      badge: '👥',
      routerLink: ['/team'],
      tooltip: _TranslateService.instant('_Layout.sideNav.team'),
      tooltipOptions: { tooltipStyleClass: 'mobile-tooltip' },
    },
    {
      label: _TranslateService.instant('_Layout.sideNav.settings'),
      badge: '⚙️',
      routerLink: ['/settings'],
      tooltip: _TranslateService.instant('_Layout.sideNav.settings'),
      tooltipOptions: { tooltipStyleClass: 'mobile-tooltip' },
    },
  ];
}

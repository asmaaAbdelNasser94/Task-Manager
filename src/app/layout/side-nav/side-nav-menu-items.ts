import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

export function sideMenuItems(translate: TranslateService): MenuItem[] {
  return [
    {
      label: translate.instant('_Layout_.sideNav.dashboard'),
      badge: '📊',
      routerLink: ['/dashboard'],
      routerLinkActiveOptions: { exact: true }, // Only active for exact match to avoid multiple active states
    },
    {
      label: translate.instant('_Layout_.sideNav.tasks'),
      badge: '✅',
      routerLink: ['/tasks'],
    },
    {
      label: translate.instant('_Layout_.sideNav.calendar'),
      badge: '📅',
      routerLink: ['/calendar'],
    },
    {
      label: translate.instant('_Layout_.sideNav.analytics'),
      badge: '📈',
      routerLink: ['/analytics'],
    },
    {
      label: translate.instant('_Layout_.sideNav.team'),
      badge: '👥',
      routerLink: ['/team'],
    },
    {
      label: translate.instant('_Layout_.sideNav.settings'),
      badge: '⚙️',
      routerLink: ['/settings'],
    },
  ];
}

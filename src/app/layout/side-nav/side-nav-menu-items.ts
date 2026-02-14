import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

export function sideMenuItems(translate: TranslateService): MenuItem[] {
  return [
    {
      label: translate.instant('_Layout.sideNav.dashboard'),
      badge: '📊',
      routerLink: ['/dashboard'],
      routerLinkActiveOptions: { exact: true }, // Only active for exact match to avoid multiple active states
    },
    {
      label: translate.instant('_Layout.sideNav.tasks'),
      badge: '✅',
      routerLink: ['/tasks'],
    },
    {
      label: translate.instant('_Layout.sideNav.analytics'),
      badge: '📈',
      routerLink: ['/analytics'],
    },
    {
      label: translate.instant('_Layout.sideNav.calendar'),
      badge: '📅',
      routerLink: ['/calendar'],
    },
    {
      label: translate.instant('_Layout.sideNav.team'),
      badge: '👥',
      routerLink: ['/team'],
    },
    {
      label: translate.instant('_Layout.sideNav.settings'),
      badge: '⚙️',
      routerLink: ['/settings'],
    },
  ];
}

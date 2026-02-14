import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { SideNav } from './side-nav/side-nav';

@Component({
  selector: 'task-manager-layout',
  imports:
    [Header,
      SideNav,
      RouterOutlet
    ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout { }

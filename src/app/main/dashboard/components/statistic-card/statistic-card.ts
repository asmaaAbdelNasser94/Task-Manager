import { Component, input, signal, Signal, WritableSignal } from '@angular/core';
import { Card } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';
import { Statistic } from '../../../../core/models/dashboard.model';
import { CHANGE_TYPE_CLASS } from './change-type.config';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'task-manager-statistic-card',
  imports: [Card, SkeletonModule, TranslateModule],
  templateUrl: './statistic-card.html',
  styleUrl: './statistic-card.scss',
})
export class StatisticCard {
  public data = input<Statistic>();
  // public loading = input<boolean>();

  public loading: WritableSignal<boolean> = signal(true); // For testing purposes
  public changeTypeClassMap = CHANGE_TYPE_CLASS;

  private timeOutRef: any;

  ngOnInit(): void {
    setTimeout(() => this.loading.set(false), 400);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOutRef);
  }
}

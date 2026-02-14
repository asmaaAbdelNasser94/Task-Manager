import { Component, computed, input } from '@angular/core';
import { Statistic } from '../../../../core/models/dashboard.model';
import { StatisticCard } from '../statistic-card/statistic-card';
import { TaskBoard } from '../../../../shared/components/task-board/task-board';

@Component({
  selector: 'task-manager-dashboard-page-container',
  imports: [StatisticCard, TaskBoard],
  templateUrl: './dashboard-page-container.html',
  styleUrl: './dashboard-page-container.scss',
})
export class DashboardPageContainer {
  public statistics = input<Statistic[]>();
  public loadingStatistics = input<boolean>();
  public errorStatistics = input<Error>();
}

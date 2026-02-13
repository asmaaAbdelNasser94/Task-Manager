import { Component, computed, input } from '@angular/core';
import { Statistic, Task } from '../../../../core/models/dashboard';
import { StatisticCard } from "../statistic-card/statistic-card";

@Component({
  selector: 'task-manager-dashboard-page-container',
  imports: [StatisticCard],
  templateUrl: './dashboard-page-container.html',
  styleUrl: './dashboard-page-container.scss',
})
export class DashboardPageContainer {
  public tasks = input<Task[]>();
  public statistics = input<Statistic[]>();

  public loadingStatistics = input<boolean>();
  public errorStatistics = input<Error>();

  public loadingTasks = input<boolean>();
  public errorTasks = input<Error>();
}

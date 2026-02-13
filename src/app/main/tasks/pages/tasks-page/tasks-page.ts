import { Component } from '@angular/core';
import { TasksPageContainer } from "../../components/tasks-page-container/tasks-page-container";

@Component({
  selector: 'task-manager-tasks-page',
  imports: [TasksPageContainer],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
})
export class TasksPage {

}

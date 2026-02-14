import { Component } from '@angular/core';
import { TaskBoard } from "../../../../shared/components/task-board/task-board";

@Component({
  selector: 'task-manager-tasks-page-container',
  imports: [TaskBoard],
  templateUrl: './tasks-page-container.html',
  styleUrl: './tasks-page-container.scss',
})
export class TasksPageContainer {

}

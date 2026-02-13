import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPageContainer } from './tasks-page-container';

describe('TasksPageContainer', () => {
  let component: TasksPageContainer;
  let fixture: ComponentFixture<TasksPageContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPageContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksPageContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

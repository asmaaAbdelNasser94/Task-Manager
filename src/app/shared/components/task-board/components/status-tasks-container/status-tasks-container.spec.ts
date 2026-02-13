import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTasksContainer } from './status-tasks-container';

describe('StatusTasksContainer', () => {
  let component: StatusTasksContainer;
  let fixture: ComponentFixture<StatusTasksContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusTasksContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusTasksContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

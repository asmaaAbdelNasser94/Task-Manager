import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTaskForm } from './add-edit-task-form';

describe('AddEditTaskForm', () => {
  let component: AddEditTaskForm;
  let fixture: ComponentFixture<AddEditTaskForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTaskForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTaskForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

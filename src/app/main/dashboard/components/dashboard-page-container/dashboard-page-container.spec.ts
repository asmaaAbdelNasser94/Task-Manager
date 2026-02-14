import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPageContainer } from './dashboard-page-container';

describe('DashboardPageContainer', () => {
  let component: DashboardPageContainer;
  let fixture: ComponentFixture<DashboardPageContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPageContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPageContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

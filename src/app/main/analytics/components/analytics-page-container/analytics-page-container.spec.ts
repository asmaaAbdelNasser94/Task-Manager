import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsPageContainer } from './analytics-page-container';

describe('AnalyticsPageContainer', () => {
  let component: AnalyticsPageContainer;
  let fixture: ComponentFixture<AnalyticsPageContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsPageContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsPageContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsSummaryComponent } from './credits-summary.component';

describe('CreditsSummaryComponent', () => {
  let component: CreditsSummaryComponent;
  let fixture: ComponentFixture<CreditsSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditsSummaryComponent]
    });
    fixture = TestBed.createComponent(CreditsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

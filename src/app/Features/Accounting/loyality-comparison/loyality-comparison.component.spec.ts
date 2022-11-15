import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityComparisonComponent } from './loyality-comparison.component';

describe('LoyalityComparisonComponent', () => {
  let component: LoyalityComparisonComponent;
  let fixture: ComponentFixture<LoyalityComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyalityComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

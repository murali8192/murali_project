import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BsReportsComponent } from './bs-reports.component';

describe('BsReportsComponent', () => {
  let component: BsReportsComponent;
  let fixture: ComponentFixture<BsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

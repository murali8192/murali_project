import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsReportsComponent } from './fs-reports.component';

describe('FsReportsComponent', () => {
  let component: FsReportsComponent;
  let fixture: ComponentFixture<FsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FsReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

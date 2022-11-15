import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsDetailsComponent } from './fs-details.component';

describe('FsDetailsComponent', () => {
  let component: FsDetailsComponent;
  let fixture: ComponentFixture<FsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

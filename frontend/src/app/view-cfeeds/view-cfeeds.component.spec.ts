import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCFeedsComponent } from './view-cfeeds.component';

describe('ViewCFeedsComponent', () => {
  let component: ViewCFeedsComponent;
  let fixture: ComponentFixture<ViewCFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCFeedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

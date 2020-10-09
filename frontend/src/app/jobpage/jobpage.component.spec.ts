import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobpageComponent } from './jobpage.component';

describe('JobpageComponent', () => {
  let component: JobpageComponent;
  let fixture: ComponentFixture<JobpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompComponent } from './view-comp.component';

describe('ViewCompComponent', () => {
  let component: ViewCompComponent;
  let fixture: ComponentFixture<ViewCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

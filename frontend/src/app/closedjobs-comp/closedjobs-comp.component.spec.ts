import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedjobsCompComponent } from './closedjobs-comp.component';

describe('ClosedjobsCompComponent', () => {
  let component: ClosedjobsCompComponent;
  let fixture: ComponentFixture<ClosedjobsCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedjobsCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedjobsCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessaginCComponent } from './messagin-c.component';

describe('MessaginCComponent', () => {
  let component: MessaginCComponent;
  let fixture: ComponentFixture<MessaginCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessaginCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessaginCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextinggroundComponent } from './textingground.component';

describe('TextinggroundComponent', () => {
  let component: TextinggroundComponent;
  let fixture: ComponentFixture<TextinggroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextinggroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextinggroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

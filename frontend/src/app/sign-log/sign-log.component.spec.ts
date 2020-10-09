import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignLogComponent } from './sign-log.component';

describe('SignLogComponent', () => {
  let component: SignLogComponent;
  let fixture: ComponentFixture<SignLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevOwnerPageComponent } from './dev-owner-page.component';

describe('DevOwnerPageComponent', () => {
  let component: DevOwnerPageComponent;
  let fixture: ComponentFixture<DevOwnerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevOwnerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevOwnerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

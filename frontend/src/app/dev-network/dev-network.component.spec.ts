import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevNetworkComponent } from './dev-network.component';

describe('DevNetworkComponent', () => {
  let component: DevNetworkComponent;
  let fixture: ComponentFixture<DevNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

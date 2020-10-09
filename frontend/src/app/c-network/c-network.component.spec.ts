import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CNetworkComponent } from './c-network.component';

describe('CNetworkComponent', () => {
  let component: CNetworkComponent;
  let fixture: ComponentFixture<CNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

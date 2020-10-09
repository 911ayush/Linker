import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CManageComponent } from './c-manage.component';

describe('CManageComponent', () => {
  let component: CManageComponent;
  let fixture: ComponentFixture<CManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

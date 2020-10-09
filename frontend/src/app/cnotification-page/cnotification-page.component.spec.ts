import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnotificationPageComponent } from './cnotification-page.component';

describe('CnotificationPageComponent', () => {
  let component: CnotificationPageComponent;
  let fixture: ComponentFixture<CnotificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnotificationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnotificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

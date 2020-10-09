import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignLogCompanyComponent } from './sign-log-company.component';

describe('SignLogCompanyComponent', () => {
  let component: SignLogCompanyComponent;
  let fixture: ComponentFixture<SignLogCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignLogCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignLogCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

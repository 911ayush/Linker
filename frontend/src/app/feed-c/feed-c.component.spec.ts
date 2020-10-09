import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedCComponent } from './feed-c.component';

describe('FeedCComponent', () => {
  let component: FeedCComponent;
  let fixture: ComponentFixture<FeedCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTempletComponent } from './post-templet.component';

describe('PostTempletComponent', () => {
  let component: PostTempletComponent;
  let fixture: ComponentFixture<PostTempletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTempletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTempletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

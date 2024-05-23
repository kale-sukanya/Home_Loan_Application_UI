import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPersonalDetailsComponent } from './post-personal-details.component';

describe('PostPersonalDetailsComponent', () => {
  let component: PostPersonalDetailsComponent;
  let fixture: ComponentFixture<PostPersonalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostPersonalDetailsComponent]
    });
    fixture = TestBed.createComponent(PostPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

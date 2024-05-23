import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLoanDetailsComponent } from './post-loan-details.component';

describe('PostLoanDetailsComponent', () => {
  let component: PostLoanDetailsComponent;
  let fixture: ComponentFixture<PostLoanDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostLoanDetailsComponent]
    });
    fixture = TestBed.createComponent(PostLoanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackYourApplicationStatusComponent } from './track-your-application-status.component';

describe('TrackYourApplicationStatusComponent', () => {
  let component: TrackYourApplicationStatusComponent;
  let fixture: ComponentFixture<TrackYourApplicationStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackYourApplicationStatusComponent]
    });
    fixture = TestBed.createComponent(TrackYourApplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

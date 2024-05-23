import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllApplicationsComponent } from './view-all-applications.component';

describe('ViewAllApplicationsComponent', () => {
  let component: ViewAllApplicationsComponent;
  let fixture: ComponentFixture<ViewAllApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllApplicationsComponent]
    });
    fixture = TestBed.createComponent(ViewAllApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

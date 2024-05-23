import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyApplicationsComponent } from './view-my-applications.component';

describe('ViewMyApplicationsComponent', () => {
  let component: ViewMyApplicationsComponent;
  let fixture: ComponentFixture<ViewMyApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMyApplicationsComponent]
    });
    fixture = TestBed.createComponent(ViewMyApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

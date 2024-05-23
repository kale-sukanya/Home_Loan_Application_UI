import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewYourApplicationComponent } from './view-your-application.component';

describe('ViewYourApplicationComponent', () => {
  let component: ViewYourApplicationComponent;
  let fixture: ComponentFixture<ViewYourApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewYourApplicationComponent]
    });
    fixture = TestBed.createComponent(ViewYourApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

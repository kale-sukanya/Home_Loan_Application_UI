import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApplicationStatusComponent } from './update-application-status.component';

describe('UpdateApplicationStatusComponent', () => {
  let component: UpdateApplicationStatusComponent;
  let fixture: ComponentFixture<UpdateApplicationStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateApplicationStatusComponent]
    });
    fixture = TestBed.createComponent(UpdateApplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

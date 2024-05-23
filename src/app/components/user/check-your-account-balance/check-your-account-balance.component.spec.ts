import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckYourAccountBalanceComponent } from './check-your-account-balance.component';

describe('CheckYourAccountBalanceComponent', () => {
  let component: CheckYourAccountBalanceComponent;
  let fixture: ComponentFixture<CheckYourAccountBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckYourAccountBalanceComponent]
    });
    fixture = TestBed.createComponent(CheckYourAccountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

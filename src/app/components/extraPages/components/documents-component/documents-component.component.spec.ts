import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsComponentComponent } from './documents-component.component';

describe('DocumentsComponentComponent', () => {
  let component: DocumentsComponentComponent;
  let fixture: ComponentFixture<DocumentsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsComponentComponent]
    });
    fixture = TestBed.createComponent(DocumentsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private applicationIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  setApplicationId(applicationId: string): void {
    this.applicationIdSubject.next(applicationId);
  }

  getApplicationId(): Observable<string> {
    return this.applicationIdSubject.asObservable();
  }
}

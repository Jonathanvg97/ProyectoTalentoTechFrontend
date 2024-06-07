import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { businessInterface } from '../../core/interface/business.interface';

@Injectable({
  providedIn: 'root'
})
export class BusinessDetailsService {
  private businessDetailsSubject: BehaviorSubject<businessInterface | null> = new BehaviorSubject<businessInterface | null>(null);

  constructor() {}

  setBusinessDetails(details: businessInterface): void {
    this.businessDetailsSubject.next(details);
  }

  getBusinessDetails(): Observable<businessInterface | null> {
    return this.businessDetailsSubject.asObservable();
  }
}

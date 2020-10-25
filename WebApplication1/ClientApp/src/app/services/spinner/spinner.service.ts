import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  private httpLoading = new ReplaySubject<boolean>(1);
  
  getLoadingStatus(): Observable<boolean> {
    return this.httpLoading.asObservable();
  }

  setSpinner(inprogess: boolean) {
    this.httpLoading.next(inprogess);
  }
}

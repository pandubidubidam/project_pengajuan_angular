import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subjectDealerDetail = new Subject<any>()
  
  private httpLoading$ = new ReplaySubject<boolean>(1);

  constructor() { }

  sendDealerDetailtoTable(){
    this.subjectDealerDetail.next()
  }

  getDealerDetailtoTable(): Observable<any> {
    return this.subjectDealerDetail.asObservable()
  }

  httpProgress(): Observable<boolean> {
    return this.httpLoading$.asObservable();
  }

  setHttpProgressStatus(inprogess: boolean) {
    this.httpLoading$.next(inprogess);
  }
}

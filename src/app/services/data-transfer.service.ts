import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() {
  }
  companyDetails$ = new Subject();

  getCompanyData(data: any) {
    this.companyDetails$.next(data);
  }
}

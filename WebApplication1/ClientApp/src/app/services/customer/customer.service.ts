import { Injectable } from '@angular/core';
import { CustomerModel } from '../../models/Customer';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomerTable } from '../../components/customers-table/customers-table.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  constructor(private http: HttpClient) { }

  private foundCustomers: Subject<CustomerModel[]> = new Subject<CustomerModel[]>();

  getFoundCustomersListener() {
    return this.foundCustomers.asObservable();
  }

  saveCustomer(customer: CustomerModel) {
    if (customer.dateOfBirth == null)
      customer.dateOfBirth = new Date();

    return this.http.post<CustomerModel>('http://localhost:56416/api/Customers', customer)
  }

  searchCustomer(selectedIdentifier: string, val: number) {
    const params = new HttpParams().append('selectedIdentifier', selectedIdentifier).append('val', val.toString());

    return this.http.get('http://localhost:56416/api/customers/search', { params })
      .subscribe((res: CustomerModel[]) => {
        this.foundCustomers.next(res);
      })
  }

}

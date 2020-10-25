import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer/customer.service';
import { CustomerModel } from '../../models/Customer';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.css']
})
export class CustomersTableComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private customerService: CustomerService, private router: Router) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.foundCustomersSub = this.customerService.getFoundCustomersListener()
      .subscribe((res: CustomerModel[]) => {
        this.dataSource = new MatTableDataSource<CustomerTable>(res as CustomerTable[]);
      });
  }
  
  private foundCustomersSub: Subscription;

  displayedColumns: string[] = ['identityNumber', 'phone', 'firstName', 'lastName'];
  dataSource: MatTableDataSource<CustomerTable>;

  getRecord(row) {
    this.router.navigate(['/edit-or-create', row]);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.foundCustomersSub.unsubscribe();
  }
}

export interface CustomerTable {
  identityNumber: number;
  phone: number;
  firstName: string;
  lastName: string;
}



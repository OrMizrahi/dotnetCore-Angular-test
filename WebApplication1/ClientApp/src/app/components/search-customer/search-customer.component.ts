import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit, AfterViewInit {

  constructor(private customerService: CustomerService, private loaderService: SpinnerService) { }

  ngOnInit(): void {
  }

  selectedIdentifier = 'Identity Number';
  val: number;
  loading:boolean = false;

  onSubmit() {
    if (this.val != null) {
      this.customerService.searchCustomer(this.selectedIdentifier,this.val)
    }
  }

  ngAfterViewInit() {
    this.loaderService.getLoadingStatus().subscribe(res => { this.loading = res; })
  }
}

import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerModel } from '../../models/Customer';
import { CustomerService } from '../../services/customer/customer.service';
import { ActivatedRoute } from '@angular/router';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-or-create-customer',
  templateUrl: './edit-or-create-customer.component.html',
  styleUrls: ['./edit-or-create-customer.component.css']
})
export class EditOrCreateCustomerComponent implements OnInit, OnDestroy,AfterViewInit  {

  constructor(private customerService: CustomerService, private _Activatedroute: ActivatedRoute, private loaderService: SpinnerService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.Customer = {
      identityNumber: null,
      comments: null,
      dateOfBirth: null,
      firstName: null,
      lastName: null,
      phone: null
    }

    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      if (params.keys.length > 0) {
        this.Customer.identityNumber = +params.get('identityNumber');
        this.Customer.phone = +params.get('phone');
        this.Customer.firstName = params.get('firstName');
        this.Customer.lastName = params.get('lastName');
      }
    });
}

  Customer: CustomerModel;
  sub: any;
  loading: boolean =  false;


  onSubmit(form: NgForm) {
    if (form.valid) {
      this.customerService.saveCustomer(form.value).subscribe(() => {
        this._snackBar.open('User has been successfully saved/edited', 'Great', {
          duration: 2500,
        });
      });
    };
      form.reset();
  }

 
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    this.loaderService.getLoadingStatus().subscribe(res => { this.loading = res; })
  }
}

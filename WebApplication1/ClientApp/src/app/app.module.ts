import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EditOrCreateCustomerComponent } from './components/edit-or-create-customer/edit-or-create-customer.component';
import { SearchCustomerComponent } from './components/search-customer/search-customer.component';
import { CustomerService } from './services/customer/customer.service';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { SpinnerService } from './services/spinner/spinner.service';
import { httpInterceptor } from './http-Interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomePageComponent,
    EditOrCreateCustomerComponent,
    SearchCustomerComponent,
    CustomersTableComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
  ],
  providers: [CustomerService, SpinnerService, { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

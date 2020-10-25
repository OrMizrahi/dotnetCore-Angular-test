import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { EditOrCreateCustomerComponent } from './components/edit-or-create-customer/edit-or-create-customer.component';
import { SearchCustomerComponent } from './components/search-customer/search-customer.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'edit-or-create', component: EditOrCreateCustomerComponent },
  { path: 'search', component: SearchCustomerComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

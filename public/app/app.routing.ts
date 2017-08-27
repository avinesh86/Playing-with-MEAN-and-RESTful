import { RouterModule, Routes } from '@angular/router';

import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentsGridComponent } from './departments/departments-grid.component';
import { DepartmentsEditComponent } from './departments/department-edit.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomersGridComponent } from './customers/customers-grid.component';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { CustomerEditReactiveComponent } from './customers/customer-edit-reactive.component';
import { IRouting } from './shared/interfaces';

const routes: Routes = [
  { path: 'departments', component: DepartmentsComponent},
  { path: 'departments/:id', component: DepartmentsEditComponent},
  { path: 'customers', component: CustomersComponent},
  { path: 'customers/:id', component: CustomerEditComponent},
  { path: '**', pathMatch:'full', redirectTo: '/customers' } //catch any unfound routes and redirect to home page
];

export const appRouting: IRouting = { 
    routes: RouterModule.forRoot(routes),
    components: [ DepartmentsComponent, DepartmentsEditComponent, DepartmentsGridComponent, CustomersComponent, CustomerEditComponent, CustomerEditReactiveComponent, CustomersGridComponent ]
};

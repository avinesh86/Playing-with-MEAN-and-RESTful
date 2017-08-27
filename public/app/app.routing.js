"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var departments_component_1 = require("./departments/departments.component");
var departments_grid_component_1 = require("./departments/departments-grid.component");
var department_edit_component_1 = require("./departments/department-edit.component");
var customers_component_1 = require("./customers/customers.component");
var customers_grid_component_1 = require("./customers/customers-grid.component");
var customer_edit_component_1 = require("./customers/customer-edit.component");
var customer_edit_reactive_component_1 = require("./customers/customer-edit-reactive.component");
var routes = [
    { path: 'departments', component: departments_component_1.DepartmentsComponent },
    { path: 'departments/:id', component: department_edit_component_1.DepartmentsEditComponent },
    { path: 'customers', component: customers_component_1.CustomersComponent },
    { path: 'customers/:id', component: customer_edit_component_1.CustomerEditComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/customers' } //catch any unfound routes and redirect to home page
];
exports.appRouting = {
    routes: router_1.RouterModule.forRoot(routes),
    components: [departments_component_1.DepartmentsComponent, department_edit_component_1.DepartmentsEditComponent, departments_grid_component_1.DepartmentsGridComponent, customers_component_1.CustomersComponent, customer_edit_component_1.CustomerEditComponent, customer_edit_reactive_component_1.CustomerEditReactiveComponent, customers_grid_component_1.CustomersGridComponent]
};
//# sourceMappingURL=app.routing.js.map
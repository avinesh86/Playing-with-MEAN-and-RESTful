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
var designations_component_1 = require("./designations/designations.component");
var designations_grid_component_1 = require("./designations/designations-grid.component");
var designation_edit_component_1 = require("./designations/designation-edit.component");
var employees_component_1 = require("./employees/employees.component");
var employees_grid_component_1 = require("./employees/employees-grid.component");
var routes = [
    { path: 'employees', component: employees_component_1.EmployeesComponent },
    { path: 'designations', component: designations_component_1.DesignationsComponent },
    { path: 'designations/:id', component: designation_edit_component_1.DesignationEditComponent },
    { path: 'departments', component: departments_component_1.DepartmentsComponent },
    { path: 'departments/:id', component: department_edit_component_1.DepartmentsEditComponent },
    { path: 'customers', component: customers_component_1.CustomersComponent },
    { path: 'customers/:id', component: customer_edit_component_1.CustomerEditComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/customers' } //catch any unfound routes and redirect to home page
];
exports.appRouting = {
    routes: router_1.RouterModule.forRoot(routes),
    components: [employees_component_1.EmployeesComponent, employees_grid_component_1.EmployeesGridComponent, designations_component_1.DesignationsComponent, designation_edit_component_1.DesignationEditComponent, designations_grid_component_1.DesignationsGridComponent, departments_component_1.DepartmentsComponent,
        department_edit_component_1.DepartmentsEditComponent, departments_grid_component_1.DepartmentsGridComponent, customers_component_1.CustomersComponent, customer_edit_component_1.CustomerEditComponent,
        customer_edit_reactive_component_1.CustomerEditReactiveComponent, customers_grid_component_1.CustomersGridComponent]
};
//# sourceMappingURL=app.routing.js.map
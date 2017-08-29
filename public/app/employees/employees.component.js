"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_filter_service_1 = require("../core/data-filter.service");
var employee_data_service_1 = require("../core/employee.data.service");
var EmployeesComponent = (function () {
    function EmployeesComponent(router, dataService, dataFilter) {
        this.router = router;
        this.dataService = dataService;
        this.dataFilter = dataFilter;
        this.employees = [];
        this.filteredEmployees = [];
        this.totalRecords = 0;
        this.pageSize = 10;
    }
    EmployeesComponent.prototype.ngOnInit = function () {
        this.title = 'Employee';
        this.getEmployeesPage(1);
    };
    EmployeesComponent.prototype.filterChanged = function (filterText) {
        if (filterText && this.employees) {
            var props = ['firstName', 'lastName', 'address', 'city', 'state.name'];
            this.filteredEmployees = this.dataFilter.filter(this.employees, props, filterText);
        }
        else {
            this.filteredEmployees = this.employees;
        }
    };
    EmployeesComponent.prototype.pageChanged = function (page) {
        this.getEmployeesPage(page);
    };
    EmployeesComponent.prototype.getEmployeesPage = function (page) {
        var _this = this;
        this.dataService.getEmployeesPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe(function (response) {
            _this.employees = _this.filteredEmployees = response.results;
            _this.totalRecords = response.totalRecords;
        }, function (err) { return console.log(err); }, function () { return console.log('getEmployeesPage() retrieved employees'); });
    };
    EmployeesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'employee',
            templateUrl: 'employees.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            employee_data_service_1.EmployeeDataService,
            data_filter_service_1.DataFilterService])
    ], EmployeesComponent);
    return EmployeesComponent;
}());
exports.EmployeesComponent = EmployeesComponent;
//# sourceMappingURL=employees.component.js.map
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
var data_service_1 = require("../core/data.service");
var DepartmentsComponent = (function () {
    function DepartmentsComponent(router, dataService, dataFilter) {
        this.router = router;
        this.dataService = dataService;
        this.dataFilter = dataFilter;
        this.departments = [];
        this.filteredDepartments = [];
        this.totalRecords = 0;
        this.pageSize = 10;
    }
    DepartmentsComponent.prototype.ngOnInit = function () {
        this.title = 'Departments';
        this.getDepartmentsPage(1);
    };
    DepartmentsComponent.prototype.filterChanged = function (filterText) {
        if (filterText && this.departments) {
            var props = ['departmentName', 'description'];
            this.filteredDepartments = this.dataFilter.filter(this.departments, props, filterText);
        }
        else {
            this.filteredDepartments = this.departments;
        }
    };
    DepartmentsComponent.prototype.pageChanged = function (page) {
        this.getDepartmentsPage(page);
    };
    DepartmentsComponent.prototype.getDepartmentsPage = function (page) {
        var _this = this;
        this.dataService.getDepartmentsPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe(function (response) {
            _this.departments = _this.filteredDepartments = response.results;
            _this.totalRecords = response.totalRecords;
        }, function (err) { return console.log(err); }, function () { return console.log('getDepartmentsPage() retrieved departments'); });
    };
    DepartmentsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'departments',
            templateUrl: 'departments.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            data_service_1.DataService,
            data_filter_service_1.DataFilterService])
    ], DepartmentsComponent);
    return DepartmentsComponent;
}());
exports.DepartmentsComponent = DepartmentsComponent;
//# sourceMappingURL=departments.component.js.map
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
var department_data_service_1 = require("../core/department.data.service");
var DepartmentsEditComponent = (function () {
    function DepartmentsEditComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.department = {
            departmentName: '',
            description: ''
        };
        this.operationText = 'Insert';
    }
    DepartmentsEditComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getDepartment(id);
        }
    };
    DepartmentsEditComponent.prototype.getDepartment = function (id) {
        var _this = this;
        this.dataService.getDepartment(id)
            .subscribe(function (department) {
            _this.department = department;
        }, function (err) { return console.log(err); });
    };
    DepartmentsEditComponent.prototype.submit = function () {
        var _this = this;
        if (this.department._id) {
            this.dataService.updateDepartment(this.department)
                .subscribe(function (department) {
                if (department) {
                    _this.router.navigate(['/departments']);
                }
                else {
                    _this.errorMessage = 'Unable to save department';
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.insertDepartment(this.department)
                .subscribe(function (department) {
                if (department) {
                    _this.router.navigate(['/departments']);
                }
                else {
                    _this.errorMessage = 'Unable to add department';
                }
            }, function (err) { return console.log(err); });
        }
    };
    DepartmentsEditComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/departments']);
    };
    DepartmentsEditComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deleteDepartment(this.department._id)
            .subscribe(function (status) {
            if (status) {
                _this.router.navigate(['/departments']);
            }
            else {
                _this.errorMessage = 'Unable to delete department';
            }
        }, function (err) { return console.log(err); });
    };
    DepartmentsEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'department-edit',
            templateUrl: 'department-edit.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            department_data_service_1.DepartmentDataService])
    ], DepartmentsEditComponent);
    return DepartmentsEditComponent;
}());
exports.DepartmentsEditComponent = DepartmentsEditComponent;
//# sourceMappingURL=department-edit.component.js.map
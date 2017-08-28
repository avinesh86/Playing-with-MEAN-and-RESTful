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
var http_1 = require("@angular/http");
//Grab everything with import 'rxjs/Rx';
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var DepartmentDataService = (function () {
    function DepartmentDataService(http) {
        this.http = http;
        this.departmentURI = '/api/departments';
    }
    DepartmentDataService.prototype.getDepartments = function () {
        return this.http.get(this.departmentURI)
            .map(function (res) {
            var departments = res.json();
            return departments;
        })
            .catch(this.handleError);
    };
    DepartmentDataService.prototype.getDepartmentsPage = function (page, pageSize) {
        return this.http.get(this.departmentURI + "/page/" + page + "/" + pageSize)
            .map(function (res) {
            var totalRecords = +res.headers.get('x-inlinecount');
            var departments = res.json();
            return {
                results: departments,
                totalRecords: totalRecords
            };
        })
            .catch(this.handleError);
    };
    DepartmentDataService.prototype.getDepartment = function (id) {
        return this.http.get(this.departmentURI + '/' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DepartmentDataService.prototype.insertDepartment = function (department) {
        return this.http.post(this.departmentURI, department)
            .map(function (res) {
            var data = res.json();
            console.log('insertDepartment status: ' + data.status);
            return data.department;
        })
            .catch(this.handleError);
    };
    DepartmentDataService.prototype.updateDepartment = function (department) {
        return this.http.put(this.departmentURI + '/' + department._id, department)
            .map(function (res) {
            var data = res.json();
            console.log('updateDepartment status: ' + data.status);
            return data.department;
        })
            .catch(this.handleError);
    };
    DepartmentDataService.prototype.deleteDepartment = function (id) {
        return this.http.delete(this.departmentURI + '/' + id)
            .map(function (res) { return res.json().status; })
            .catch(this.handleError);
    };
    DepartmentDataService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error instanceof http_1.Response) {
            var errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch (err) {
                errMessage = error.statusText;
            }
            return Observable_1.Observable.throw(errMessage);
            // Use the following instead if using lite-server
            //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable_1.Observable.throw(error || 'Node.js server error');
    };
    DepartmentDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], DepartmentDataService);
    return DepartmentDataService;
}());
exports.DepartmentDataService = DepartmentDataService;
//# sourceMappingURL=department.data.service.js.map
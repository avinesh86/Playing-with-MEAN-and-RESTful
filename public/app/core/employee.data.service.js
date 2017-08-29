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
var EmployeeDataService = (function () {
    function EmployeeDataService(http) {
        this.http = http;
        this.employeeURI = '/api/employees';
    }
    EmployeeDataService.prototype.getEmployees = function () {
        return this.http.get(this.employeeURI)
            .map(function (res) {
            var employees = res.json();
            return employees;
        })
            .catch(this.handleError);
    };
    EmployeeDataService.prototype.getEmployeesPage = function (page, pageSize) {
        return this.http.get(this.employeeURI + "/page/" + page + "/" + pageSize)
            .map(function (res) {
            var totalRecords = +res.headers.get('x-inlinecount');
            var employees = res.json();
            return {
                results: employees,
                totalRecords: totalRecords
            };
        })
            .catch(this.handleError);
    };
    EmployeeDataService.prototype.getEmployee = function (id) {
        return this.http.get(this.employeeURI + '/' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EmployeeDataService.prototype.insertEmployee = function (employee) {
        return this.http.post(this.employeeURI, employee)
            .map(function (res) {
            var data = res.json();
            console.log('insertEmployee status: ' + data.status);
            return data.employee;
        })
            .catch(this.handleError);
    };
    EmployeeDataService.prototype.updateEmployee = function (employee) {
        return this.http.put(this.employeeURI + '/' + employee._id, employee)
            .map(function (res) {
            var data = res.json();
            console.log('updateEmployee status: ' + data.status);
            return data.employee;
        })
            .catch(this.handleError);
    };
    EmployeeDataService.prototype.deleteEmployee = function (id) {
        return this.http.delete(this.employeeURI + '/' + id)
            .map(function (res) { return res.json().status; })
            .catch(this.handleError);
    };
    //Not used but could be called to pass "options" (3rd parameter) to 
    //appropriate POST/PUT/DELETE calls made with http
    EmployeeDataService.prototype.getRequestOptions = function () {
        var csrfToken = ''; //would retrieve from cookie or from page
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'x-xsrf-token': csrfToken })
        });
        return options;
    };
    EmployeeDataService.prototype.getStates = function () {
        return this.http.get('/api/states')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    EmployeeDataService.prototype.handleError = function (error) {
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
    EmployeeDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], EmployeeDataService);
    return EmployeeDataService;
}());
exports.EmployeeDataService = EmployeeDataService;
//# sourceMappingURL=employee.data.service.js.map
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
var DesignationDataService = (function () {
    function DesignationDataService(http) {
        this.http = http;
        this.designationURI = '/api/designations';
    }
    DesignationDataService.prototype.getDesignations = function () {
        return this.http.get(this.designationURI)
            .map(function (res) {
            var designations = res.json();
            return designations;
        })
            .catch(this.handleError);
    };
    DesignationDataService.prototype.getDesignationsPage = function (page, pageSize) {
        return this.http.get(this.designationURI + "/page/" + page + "/" + pageSize)
            .map(function (res) {
            var totalRecords = +res.headers.get('x-inlinecount');
            var designations = res.json();
            return {
                results: designations,
                totalRecords: totalRecords
            };
        })
            .catch(this.handleError);
    };
    DesignationDataService.prototype.getDesignation = function (id) {
        return this.http.get(this.designationURI + '/' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DesignationDataService.prototype.insertDesignation = function (designation) {
        return this.http.post(this.designationURI, designation)
            .map(function (res) {
            var data = res.json();
            console.log('insertDesignation status: ' + data.status);
            return data.designation;
        })
            .catch(this.handleError);
    };
    DesignationDataService.prototype.updateDesignation = function (designation) {
        return this.http.put(this.designationURI + '/' + designation._id, designation)
            .map(function (res) {
            var data = res.json();
            console.log('updateDesignation status: ' + data.status);
            return data.designation;
        })
            .catch(this.handleError);
    };
    DesignationDataService.prototype.deleteDesignation = function (id) {
        return this.http.delete(this.designationURI + '/' + id)
            .map(function (res) { return res.json().status; })
            .catch(this.handleError);
    };
    DesignationDataService.prototype.handleError = function (error) {
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
    DesignationDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], DesignationDataService);
    return DesignationDataService;
}());
exports.DesignationDataService = DesignationDataService;
//# sourceMappingURL=designation.data.service.js.map
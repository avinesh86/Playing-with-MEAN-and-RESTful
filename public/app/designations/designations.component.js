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
var designation_data_service_1 = require("../core/designation.data.service");
var DesignationsComponent = (function () {
    function DesignationsComponent(router, dataService, dataFilter) {
        this.router = router;
        this.dataService = dataService;
        this.dataFilter = dataFilter;
        this.designations = [];
        this.filteredDesignations = [];
        this.totalRecords = 0;
        this.pageSize = 10;
    }
    DesignationsComponent.prototype.ngOnInit = function () {
        this.title = 'Designations';
        this.getDesignationsPage(1);
    };
    DesignationsComponent.prototype.filterChanged = function (filterText) {
        if (filterText && this.designations) {
            var props = ['designationName', 'description'];
            this.filteredDesignations = this.dataFilter.filter(this.designations, props, filterText);
        }
        else {
            this.filteredDesignations = this.designations;
        }
    };
    DesignationsComponent.prototype.pageChanged = function (page) {
        this.getDesignationsPage(page);
    };
    DesignationsComponent.prototype.getDesignationsPage = function (page) {
        var _this = this;
        this.dataService.getDesignationsPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe(function (response) {
            _this.designations = _this.filteredDesignations = response.results;
            _this.totalRecords = response.totalRecords;
        }, function (err) { return console.log(err); }, function () { return console.log('getDesignationsPage() retrieved designations'); });
    };
    DesignationsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'designations',
            templateUrl: 'designations.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            designation_data_service_1.DesignationDataService,
            data_filter_service_1.DataFilterService])
    ], DesignationsComponent);
    return DesignationsComponent;
}());
exports.DesignationsComponent = DesignationsComponent;
//# sourceMappingURL=designations.component.js.map
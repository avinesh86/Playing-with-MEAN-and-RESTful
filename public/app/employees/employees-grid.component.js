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
var sorter_1 = require("../core/sorter");
var trackby_service_1 = require("../core/trackby.service");
var EmployeesGridComponent = (function () {
    function EmployeesGridComponent(sorter, trackby) {
        this.sorter = sorter;
        this.trackby = trackby;
        this.employees = [];
    }
    EmployeesGridComponent.prototype.ngOnInit = function () {
    };
    EmployeesGridComponent.prototype.sort = function (prop) {
        this.sorter.sort(this.employees, prop);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], EmployeesGridComponent.prototype, "employees", void 0);
    EmployeesGridComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'employees-grid',
            templateUrl: 'employees-grid.component.html',
            //When using OnPush detectors, then the framework will check an OnPush 
            //component when any of its input properties changes, when it fires 
            //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [sorter_1.Sorter, trackby_service_1.TrackByService])
    ], EmployeesGridComponent);
    return EmployeesGridComponent;
}());
exports.EmployeesGridComponent = EmployeesGridComponent;
//# sourceMappingURL=employees-grid.component.js.map
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
var designation_data_service_1 = require("../core/designation.data.service");
var DesignationEditComponent = (function () {
    function DesignationEditComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.designation = {
            designationName: '',
            description: ''
        };
        this.operationText = 'Insert';
    }
    DesignationEditComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getDesignation(id);
        }
    };
    DesignationEditComponent.prototype.getDesignation = function (id) {
        var _this = this;
        this.dataService.getDesignation(id)
            .subscribe(function (designation) {
            _this.designation = designation;
        }, function (err) { return console.log(err); });
    };
    DesignationEditComponent.prototype.submit = function () {
        var _this = this;
        if (this.designation._id) {
            this.dataService.updateDesignation(this.designation)
                .subscribe(function (designation) {
                if (designation) {
                    _this.router.navigate(['/designations']);
                }
                else {
                    _this.errorMessage = 'Unable to save designation';
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.insertDesignation(this.designation)
                .subscribe(function (designation) {
                if (designation) {
                    _this.router.navigate(['/designations']);
                }
                else {
                    _this.errorMessage = 'Unable to add designation';
                }
            }, function (err) { return console.log(err); });
        }
    };
    DesignationEditComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/designations']);
    };
    DesignationEditComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deleteDesignation(this.designation._id)
            .subscribe(function (status) {
            if (status) {
                _this.router.navigate(['/designations']);
            }
            else {
                _this.errorMessage = 'Unable to delete designation';
            }
        }, function (err) { return console.log(err); });
    };
    DesignationEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'designation-edit',
            templateUrl: 'designation-edit.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            designation_data_service_1.DesignationDataService])
    ], DesignationEditComponent);
    return DesignationEditComponent;
}());
exports.DesignationEditComponent = DesignationEditComponent;
//# sourceMappingURL=designation-edit.component.js.map
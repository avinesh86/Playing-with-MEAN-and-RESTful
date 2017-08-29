import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/data-filter.service';
import { EmployeeDataService } from '../core/employee.data.service';
import { IEmployee, IDesignation, IDepartment, IPagedResults } from '../shared/interfaces';

@Component({ 
  moduleId: module.id,
  selector: 'employee', 
  templateUrl: 'employees.component.html'
})
export class EmployeesComponent implements OnInit {

  title: string;
  employees: IEmployee[] = [];
  filteredEmployees: IEmployee[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, 
              private dataService: EmployeeDataService,
              private dataFilter: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Employee';
    this.getEmployeesPage(1);
  }

  filterChanged(filterText: string) {
    if (filterText && this.employees) {
        let props = ['firstName', 'lastName', 'address', 'city', 'state.name'];
        this.filteredEmployees = this.dataFilter.filter(this.employees, props, filterText);
    }
    else {
      this.filteredEmployees = this.employees;
    }
  }

  pageChanged(page: number) {
    this.getEmployeesPage(page);
  }

  getEmployeesPage(page: number) {
    this.dataService.getEmployeesPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IEmployee[]>) => {
          this.employees = this.filteredEmployees = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => console.log(err),
        () => console.log('getEmployeesPage() retrieved employees'));
  }

}
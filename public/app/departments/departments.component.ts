import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/data-filter.service';
import { DepartmentDataService } from '../core/department.data.service';
import { IDepartment, IPagedResults } from '../shared/interfaces';

@Component({ 
  moduleId: module.id,
  selector: 'departments', 
  templateUrl: 'departments.component.html'
})
export class DepartmentsComponent implements OnInit {

  title: string;
  departments: IDepartment[] = [];
  filteredDepartments: IDepartment[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, 
              private dataService: DepartmentDataService,
              private dataFilter: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Departments';
    this.getDepartmentsPage(1);
  }

  filterChanged(filterText: string) {
    if (filterText && this.departments) {
        let props = ['departmentName', 'description'];
        this.filteredDepartments = this.dataFilter.filter(this.departments, props, filterText);
    }
    else {
      this.filteredDepartments = this.departments;
    }
  }

  pageChanged(page: number) {
    this.getDepartmentsPage(page);
  }

  getDepartmentsPage(page: number) {
    this.dataService.getDepartmentsPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IDepartment[]>) => {
          this.departments = this.filteredDepartments = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => console.log(err),
        () => console.log('getDepartmentsPage() retrieved departments'));
  }

}
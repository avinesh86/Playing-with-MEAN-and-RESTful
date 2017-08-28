import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/data-filter.service';
import { DesignationDataService } from '../core/designation.data.service';
import { IDesignation, IPagedResults } from '../shared/interfaces';

@Component({ 
  moduleId: module.id,
  selector: 'designations', 
  templateUrl: 'designations.component.html'
})
export class DesignationsComponent implements OnInit {

  title: string;
  designations: IDesignation[] = [];
  filteredDesignations: IDesignation[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, 
              private dataService: DesignationDataService,
              private dataFilter: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Designations';
    this.getDesignationsPage(1);
  }

  filterChanged(filterText: string) {
    if (filterText && this.designations) {
        let props = ['designationName', 'description'];
        this.filteredDesignations = this.dataFilter.filter(this.designations, props, filterText);
    }
    else {
      this.filteredDesignations = this.designations;
    }
  }

  pageChanged(page: number) {
    this.getDesignationsPage(page);
  }

  getDesignationsPage(page: number) {
    this.dataService.getDesignationsPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IDesignation[]>) => {
          this.designations = this.filteredDesignations = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => console.log(err),
        () => console.log('getDesignationsPage() retrieved designations'));
  }

}
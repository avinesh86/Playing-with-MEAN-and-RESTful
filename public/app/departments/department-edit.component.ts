import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DepartmentDataService } from '../core/department.data.service';
import { IDepartment, IState } from '../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'department-edit',
  templateUrl: 'department-edit.component.html'
})
export class DepartmentsEditComponent implements OnInit {

  department: IDepartment = {
    departmentName: '',
    description: ''
  };
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: DepartmentDataService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getDepartment(id);
    }
  }

  getDepartment(id: string) {
      this.dataService.getDepartment(id)
        .subscribe((department: IDepartment) => {
          this.department = department;
        },
        (err: any) => console.log(err));
  }

  submit() {

      if (this.department._id) {

        this.dataService.updateDepartment(this.department)
          .subscribe((department: IDepartment) => {
            if (department) {
              this.router.navigate(['/departments']);
            } else {
              this.errorMessage = 'Unable to save department';
            }
          },
          (err: any) => console.log(err));

      } else {

        this.dataService.insertDepartment(this.department)
          .subscribe((department: IDepartment) => {
            if (department) {
              this.router.navigate(['/departments']);
            }
            else {
              this.errorMessage = 'Unable to add department';
            }
          },
          (err: any) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/departments']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteDepartment(this.department._id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/departments']);
          }
          else {
            this.errorMessage = 'Unable to delete department';
          }
        },
        (err) => console.log(err));
  }

}
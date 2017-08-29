import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DesignationDataService } from '../core/designation.data.service';
import { IDesignation, IState } from '../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'designation-edit',
  templateUrl: 'designation-edit.component.html'
})
export class DesignationEditComponent implements OnInit {

  designation: IDesignation = {
    designationName: '',
    description: ''
  };
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: DesignationDataService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getDesignation(id);
    }
  }

  getDesignation(id: string) {
      this.dataService.getDesignation(id)
        .subscribe((designation: IDesignation) => {
          this.designation = designation;
        },
        (err: any) => console.log(err));
  }

  submit() {

      if (this.designation._id) {

        this.dataService.updateDesignation(this.designation)
          .subscribe((designation: IDesignation) => {
            if (designation) {
              this.router.navigate(['/designations']);
            } else {
              this.errorMessage = 'Unable to save designation';
            }
          },
          (err: any) => console.log(err));

      } else {

        this.dataService.insertDesignation(this.designation)
          .subscribe((designation: IDesignation) => {
            if (designation) {
              this.router.navigate(['/designations']);
            }
            else {
              this.errorMessage = 'Unable to add designation';
            }
          },
          (err: any) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/designations']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteDesignation(this.designation._id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/designations']);
          }
          else {
            this.errorMessage = 'Unable to delete designation';
          }
        },
        (err) => console.log(err));
  }

}
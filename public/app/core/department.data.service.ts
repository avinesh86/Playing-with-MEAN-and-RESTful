import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { IDepartment, IPagedResults } from '../shared/interfaces';

@Injectable()
export class DepartmentDataService {
  
    departmentURI: string = '/api/departments';

    constructor(private http: Http) { 

    }

    getDepartments() : Observable<IDepartment[]> {
        return this.http.get(this.departmentURI)
                   .map((res: Response) => {
                       let departments = res.json();
                       return departments;
                   })
                   .catch(this.handleError);
    }

    getDepartmentsPage(page: number, pageSize: number) : Observable<IPagedResults<IDepartment[]>> {
        return this.http.get(`${this.departmentURI}/page/${page}/${pageSize}`)
                    .map((res: Response) => {
                        const totalRecords = +res.headers.get('x-inlinecount');
                        let departments = res.json();
                        return {
                            results: departments,
                            totalRecords: totalRecords
                        };
                    })
                    .catch(this.handleError);
    }
    
    getDepartment(id: string) : Observable<IDepartment> {
        return this.http.get(this.departmentURI + '/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    insertDepartment(department: IDepartment) : Observable<IDepartment> {
        return this.http.post(this.departmentURI, department)
                   .map((res: Response) => {
                       const data = res.json();
                       console.log('insertDepartment status: ' + data.status);
                       return data.department;
                   })
                   .catch(this.handleError);
    }
   
    updateDepartment(department: IDepartment) : Observable<IDepartment> {
        return this.http.put(this.departmentURI + '/' + department._id, department) 
                   .map((res: Response) => {
                       const data = res.json();
                       console.log('updateDepartment status: ' + data.status);
                       return data.department;
                   })
                   .catch(this.handleError);
    }

    deleteDepartment(id: string) : Observable<boolean> {
        return this.http.delete(this.departmentURI + '/' + id)
                   .map((res: Response) => res.json().status)
                   .catch(this.handleError);
    }
    
    private handleError(error: any) {
        console.error('server error:', error); 
        if (error instanceof Response) {
          let errMessage = '';
          try {
            errMessage = error.json().error;
          } catch(err) {
            errMessage = error.statusText;
          }
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }

}
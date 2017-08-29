import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { IEmployee, IDepartment, IDesignation, IState, IPagedResults } from '../shared/interfaces';

@Injectable()
export class EmployeeDataService {
  
    employeeURI: string = '/api/employees';

    constructor(private http: Http) { 

    }
    
    getEmployees() : Observable<IEmployee[]> {
        return this.http.get(this.employeeURI)
                   .map((res: Response) => {
                       let employees = res.json();
                       return employees;
                   })
                   .catch(this.handleError);
    }

    getEmployeesPage(page: number, pageSize: number) : Observable<IPagedResults<IEmployee[]>> {
        return this.http.get(`${this.employeeURI}/page/${page}/${pageSize}`)
                    .map((res: Response) => {
                        const totalRecords = +res.headers.get('x-inlinecount');
                        let employees = res.json();
                        return {
                            results: employees,
                            totalRecords: totalRecords
                        };
                    })
                    .catch(this.handleError);
    }
    
    getEmployee(id: string) : Observable<IEmployee> {
        return this.http.get(this.employeeURI + '/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    insertEmployee(employee: IEmployee) : Observable<IEmployee> {
        return this.http.post(this.employeeURI, employee)
                   .map((res: Response) => {
                       const data = res.json();
                       console.log('insertEmployee status: ' + data.status);
                       return data.employee;
                   })
                   .catch(this.handleError);
    }
   
    updateEmployee(employee: IEmployee) : Observable<IEmployee> {
        return this.http.put(this.employeeURI + '/' + employee._id, employee) 
                   .map((res: Response) => {
                       const data = res.json();
                       console.log('updateEmployee status: ' + data.status);
                       return data.employee;
                   })
                   .catch(this.handleError);
    }

    deleteEmployee(id: string) : Observable<boolean> {
        return this.http.delete(this.employeeURI + '/' + id)
                   .map((res: Response) => res.json().status)
                   .catch(this.handleError);
    }

    //Not used but could be called to pass "options" (3rd parameter) to 
    //appropriate POST/PUT/DELETE calls made with http
    getRequestOptions() {
        const csrfToken = ''; //would retrieve from cookie or from page
        const options = new RequestOptions({
            headers: new Headers({ 'x-xsrf-token': csrfToken })
        });
        return options;
    }

    getStates(): Observable<IState[]> {
        return this.http.get('/api/states')
                   .map((res: Response) => res.json())
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

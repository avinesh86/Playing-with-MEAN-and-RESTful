import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { IDepartment, ICustomer, IOrder, IState, IPagedResults } from '../shared/interfaces';

@Injectable()
export class DataService {
  
    customerURI: string = '/api/customers';
    departmentURI: string = '/api/departments';

    constructor(private http: Http) { 

    }
    
    getCustomers() : Observable<ICustomer[]> {
        return this.http.get(this.customerURI)
                   .map((res: Response) => {
                       let customers = res.json();
                       this.calculateCustomersOrderTotal(customers);
                       return customers;
                   })
                   .catch(this.handleError);
    }

    getCustomersPage(page: number, pageSize: number) : Observable<IPagedResults<ICustomer[]>> {
        return this.http.get(`${this.customerURI}/page/${page}/${pageSize}`)
                    .map((res: Response) => {
                        const totalRecords = +res.headers.get('x-inlinecount');
                        let customers = res.json();
                        this.calculateCustomersOrderTotal(customers);
                        return {
                            results: customers,
                            totalRecords: totalRecords
                        };
                    })
                    .catch(this.handleError);
    }
    
    getCustomer(id: string) : Observable<ICustomer> {
        return this.http.get(this.customerURI + '/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    insertCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.post(this.customerURI, customer)
                   .map((res: Response) => {
                       const data = res.json();
                       console.log('insertCustomer status: ' + data.status);
                       return data.customer;
                   })
                   .catch(this.handleError);
    }
   
    updateCustomer(customer: ICustomer) : Observable<ICustomer> {
        return this.http.put(this.customerURI + '/' + customer._id, customer) 
                   .map((res: Response) => {
                       const data = res.json();
                       console.log('updateCustomer status: ' + data.status);
                       return data.customer;
                   })
                   .catch(this.handleError);
    }

    deleteCustomer(id: string) : Observable<boolean> {
        return this.http.delete(this.customerURI + '/' + id)
                   .map((res: Response) => res.json().status)
                   .catch(this.handleError);
    }


    getDepartments() : Observable<IDepartment[]> {
        return this.http.get(this.departmentURI)
                   .map((res: Response) => {
                       let departments = res.json();
                       this.calculateCustomersOrderTotal(departments);
                       return departments;
                   })
                   .catch(this.handleError);
    }

    getDepartmentsPage(page: number, pageSize: number) : Observable<IPagedResults<IDepartment[]>> {
        return this.http.get(`${this.departmentURI}/page/${page}/${pageSize}`)
                    .map((res: Response) => {
                        const totalRecords = +res.headers.get('x-inlinecount');
                        let departments = res.json();
                        this.calculateCustomersOrderTotal(departments);
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

    calculateCustomersOrderTotal(customers: ICustomer[]) {
        for (let customer of customers) {
            if (customer && customer.orders) {
                let total = 0;
                for (let order of customer.orders) {
                    total += (order.price * order.quantity);
                }
                customer.orderTotal = total;
            }
        }
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

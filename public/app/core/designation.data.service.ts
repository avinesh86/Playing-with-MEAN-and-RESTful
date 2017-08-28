import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { IDesignation, IPagedResults } from '../shared/interfaces';

@Injectable()
export class DesignationDataService {

    designationURI: string = '/api/designations';
    
    constructor(private http: Http) { 

    }

    getDesignations() : Observable<IDesignation[]> {
        return this.http.get(this.designationURI)
                   .map((res: Response) => {
                       let designations = res.json();
                       return designations;
                   })
                   .catch(this.handleError);
    }

    getDesignationsPage(page: number, pageSize: number) : Observable<IPagedResults<IDesignation[]>> {
        return this.http.get(`${this.designationURI}/page/${page}/${pageSize}`)
                    .map((res: Response) => {
                        const totalRecords = +res.headers.get('x-inlinecount');
                        let designations = res.json();
                        return {
                            results: designations,
                            totalRecords: totalRecords
                        };
                    })
                    .catch(this.handleError);
    }
    
    getDesignation(id: string) : Observable<IDesignation> {
        return this.http.get(this.designationURI + '/' + id)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
    }

    insertDesignation(designation: IDesignation) : Observable<IDesignation> {
        return this.http.post(this.designationURI, designation)
                   .map((res: Response) => {
                       const data = res.json();
                       console.log('insertDesignation status: ' + data.status);
                       return data.designation;
                   })
                   .catch(this.handleError);
    }
   
    updateDesignation(designation: IDesignation) : Observable<IDesignation> {
        return this.http.put(this.designationURI + '/' + designation._id, designation) 
                   .map((res: Response) => {
                       const data = res.json();
                       console.log('updateDesignation status: ' + data.status);
                       return data.designation;
                   })
                   .catch(this.handleError);
    }

    deleteDesignation(id: string) : Observable<boolean> {
        return this.http.delete(this.designationURI + '/' + id)
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
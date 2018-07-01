import { Injectable } from '@angular/core';
import { Field, FieldOption } from '../field/field';
import { Response1, ResponseField } from './question';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class QuestionService {

    private apiUrl = 'http://localhost:8090/response';

    constructor(private http: Http) { }

    findAll(): Observable<Response1[]>  {
        return this.http.get(this.apiUrl + '/list')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    /*
    findById(id: number): Observable<Response1> {
        return this.http.get(this.apiUrl + '/view/' + id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Error'));
    }
    */

    findByUserId(userId: number): Observable<Response1> {
        return this.http.get(this.apiUrl + '/user-list/' + userId)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Error'));
    }

    saveResponse(response1: Response1): Observable<Response1> {
        return this.http.post(this.apiUrl + '/add', response1)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteResponseById(id: number): Observable<boolean> {
        return null;
    }

    /*
    updateResponse(response1: Response1): Observable<Response1> {
        return this.http.put(this.apiUrl + '/update', response1)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    */

}

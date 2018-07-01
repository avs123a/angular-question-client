import { Injectable } from '@angular/core';
import { Field } from './field';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class FieldService {

    private apiUrl = 'http://localhost:8090/field';

    constructor(private http: Http) { }

    findAll(): Observable<Field[]>  {
        return this.http.get(this.apiUrl + '/list')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

	findAllActive(): Observable<Field[]>  {
        return this.http.get(this.apiUrl + '/active-list')
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    findById(id: number): Observable<Field> {
        return this.http.get(this.apiUrl + '/view/' + id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Error'));
    }

    saveField(field: Field): Observable<Field> {
        return this.http.post(this.apiUrl + '/add', field)
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteFieldById(id: number): Observable<boolean> {
        return null;
    }

    updateField(field: Field): Observable<Field> {
        return this.http.put(this.apiUrl + '/update', field)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}

import { Injectable } from '@angular/core';
import { User, UserLogin } from './user';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class UserService {

    private apiUrl = 'http://localhost:8090/user';

      // helpful variables
      // public static userName: string;
      // public static localStorageUserId: number;
      // public static sessionStorageUserId: number;

    constructor(private http: Http) { }

    /*
    findAll(): Observable<User[]>  {
    return this.http.get(this.apiUrl + '/list')
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    */

    findById(id: number): Observable<User> {
        return this.http.get(this.apiUrl + '/view/' + id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Error'));
    }

    saveUser(user: User): Observable<User> {
        return this.http.post(this.apiUrl + '/add', user)
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteUserById(id: number): Observable<boolean> {
        return null;
    }

    updateUser(user: User): Observable<User> {
        return this.http.put(this.apiUrl + '/update', user)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


      // login (check if user  exists)
    userAuth(email: string, password: string): Observable<User> {
        let userlogin: UserLogin = new UserLogin(email, password);
        return this.http.post(this.apiUrl + '/auth', userlogin)
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

      // get current (logged in) user
    getCurrentUserId(): number {
        const localStorageUserId: string = localStorage.getItem('currentUserId');
        const sessionStorageUserId: string = sessionStorage.getItem('currentUserId');
		let retUserId: number
        if (localStorageUserId) {
            retUserId = +localStorageUserId;
        } else if (sessionStorageUserId) {
            retUserId = +sessionStorageUserId;
        } else {
            retUserId = null;
        }
        return retUserId;
    }

      // get current user full name
    getCurrentUserFullName(): string {
		const userName: string = localStorage.getItem('currentUserFullName');
		const userNameS: string = sessionStorage.getItem('currentUserFullName');
		let retUserName: string;
        if (userNameS) {
            retUserName = userNameS;
        } else if (userName) {
            retUserName = userName;
        } else {
            retUserName = null;
        }
        return retUserName;
    }

      // logout
    userLogout() {
        try {
            localStorage.removeItem('currentUserId');
            sessionStorage.removeItem('currentUserId');
            localStorage.removeItem('currentUserFullName');
            sessionStorage.removeItem('currentUserFullName');
        } catch (error) {
            console.log(error);
        }
    }

}

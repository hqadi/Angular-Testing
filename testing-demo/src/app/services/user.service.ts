import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { List, UserPreview, CreateUserModel, UserFull } from '../models/users.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseURL = 'https://dummyapi.io/data/v1';
    options = {
        headers: new HttpHeaders().set('app-id', '62a5e507dd9fd61789cdf800'),
    };
    isLoggedIn = false;
    user = { name: 'Tom' };

    constructor(private http: HttpClient) { }

    getUsers(): Observable<List<UserPreview>> {
        return this.http.get<List<UserPreview>>(`${this.baseURL}/user`, {
            ...this.options,
            params: new HttpParams({ fromString: 'id=3' })
        });
    }

    createUser(payload: CreateUserModel): Observable<UserFull> {
        return this.http.post<UserFull>(`${this.baseURL}/user/create`, payload, this.options).pipe(
            retry(3),
            catchError(this.handleError),
        );
    }

    handleError(error: HttpErrorResponse): Observable<never> {
        console.log('Inside handleError():', error);
        return throwError('some error occurred');
    }
}

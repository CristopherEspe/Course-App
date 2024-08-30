import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';

import { environment } from '../enviroments/enviroment';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrlUsers}/users`);
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>(`${environment.apiUrlUsers}/users/${id}`);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${environment.apiUrlUsers}/users`, user);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${environment.apiUrlUsers}/users/${user.id}`, user);
    }

    deleteUser(id: number): Observable<User> {
        return this.http.delete<User>(`${environment.apiUrlUsers}/users/${id}`);
    }

}

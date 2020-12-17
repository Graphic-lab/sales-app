import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../auth/auth.model';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private http: HttpClient) { }

    getAll(): any {
        return this.http.get<User[]>(`/users`);
    }

    register(user: string): any {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return this.http.post(`/users/register`, user);
    }

    delete(id: number): any {
        return this.http.delete(`/users/${id}`);
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { Course } from '../models/course.model';

import { environment } from '../enviroments/enviroment';

@Injectable({
	providedIn: 'root'
})
export class EnrollmentService {

	constructor(private http: HttpClient) { }

	getCourses(): Observable<Course[]> {
		return this.http.get<Course[]>(`${environment.apiUrlCourses}/courses`);
	}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(`${environment.apiUrlUsers}/users`);
	}

	enroll(userId: number, courseId: number): Observable<any> {
		return this.http.put<any>(`${environment.apiUrlCourses}/courses/${courseId}/assign-user/${userId}`, {});
	}
}

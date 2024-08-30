import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Course } from '../models/course.model';

import { environment } from '../enviroments/enviroment';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }

    getCourse(): Observable<Course[]> {
        return this.http.get<Course[]>(`${environment.apiUrlCourses}/courses`);
    }

    getCourseById(id: number): Observable<Course> {
        return this.http.get<Course>(`${environment.apiUrlCourses}/courses/${id}`);
    }

    createCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(`${environment.apiUrlCourses}/courses`, course);
    }

    updateCourse(course: Course): Observable<Course> {
        return this.http.put<Course>(`${environment.apiUrlCourses}/courses`, course);
    }

    deleteCourse(id: number): Observable<Course> {
        return this.http.delete<Course>(`${environment.apiUrlCourses}/courses/${id}`);
    }
}

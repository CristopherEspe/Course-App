import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';

import { User } from '../../models/user.model';
import { Course } from '../../models/course.model';
import { KeycloakService } from 'keycloak-angular';

@Component({
	selector: 'app-enrollment',
	standalone: true,
	imports: [
		FormsModule,
		CommonModule
	],
	templateUrl: './enrollment.component.html',
	styleUrl: './enrollment.component.css'
})
export class EnrollmentComponent implements OnInit {

	public courses: Course[] = [];
	public users: User[] = [];

	public selectedUserId: number | null = null;
	public selectedCourseId: number | null = null;

	message: string | null = null;

	constructor(private enrollmentService: EnrollmentService, private keycloakService: KeycloakService) { }

	ngOnInit(): void {
		this.loadCourses();
		this.loadUsers();
	}

	loadUsers(): void {
		this.enrollmentService.getUsers().subscribe(
			(users: User[]) => this.users = users,
			(error) => console.error('Error loading users:', error)
		);
	}

	loadCourses(): void {
		this.enrollmentService.getCourses().subscribe(
			(courses: Course[]) => this.courses = courses,
			(error) => console.error('Error loading courses:', error)
		);
	}

  public isAdmin() {
      return this.keycloakService.getUserRoles().includes('admin');
  }

	enroll(): void {
		if (this.selectedUserId === null || this.selectedCourseId === null) {
			this.message = 'Please select both a user and a course.';
			return;
		}

		this.enrollmentService.enroll(this.selectedUserId, this.selectedCourseId).subscribe(
			() => {
				this.message = 'User enrolled successfully!';
			},
			(error) => {
				this.handleError(error);
			}
		);
	}

	private handleError(error: any): void {
		switch (error.status) {
			case 404:
				this.message = 'User or course not found.';
				break;
			case 400:
				this.message = 'Error: ' + error.error.message;
				break;
			default:
				this.message = 'An unexpected error occurred.';
				console.error('Error enrolling user:', error);
		}
	}
}

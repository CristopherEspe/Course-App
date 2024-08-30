import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Course } from '../../models/course.model';
import { User } from '../../models/user.model';
import { CourseUser } from '../../models/courseUser.model';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';

interface CourseForm {
    id: number;
    name: string;
    courseUsers: CourseUser[];
    users: User[],
    selectedUsers: {
        user: User,
        selected: boolean
    }[]
}

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{

    public courseRows: Course[] = [];
    public userRows: User[] = [];
    public showFormModal = false;
    public courses: Course[] = [];
    message: string | null = null;
    public selectedCourseUsers: User[] = [];

    public courseForm: CourseForm = {
        id: 0,
        name: '',
        courseUsers: [],
        users: [],
        selectedUsers: []
    };

    public userForm: User = {
        id: 0,
        name: '',
        email: ''
    };

    public profile: Keycloak.KeycloakProfile | null = null;

    constructor(private courseService: CourseService,
                private userService: UserService,
                private keycloakService: KeycloakService) { }

    async ngOnInit() {
        this.profile = await this.keycloakService.loadUserProfile();
        this.loadCourses();
        this.loadUsers();

        try {
            this.courseService.getCourse().subscribe((courses: Course[]) => {
                this.courses = courses;
            });
        } catch (error) {
            this.handleError(error);
            console.error('Ocurrió un error al obtener los cursos');
            console.error(error);
        }
    }

    public isAdmin() {
        return this.keycloakService.getUserRoles().includes('admin');
    }

    public async createCourse() {
        try {
            const course = await lastValueFrom(
                this.courseService.createCourse(this.courseForm)
            );
            await this.loadCourses();
        } catch (error) {
            this.handleError(error);
            console.error('Ocurrió un error al crear el curso');
            console.error(error);
        }
    }

    public async updateCourse() {
        try {
            const course = await lastValueFrom(
                this.courseService.updateCourse({
                    id: this.courseForm.id,
                    name: this.courseForm.name,
                    courseUsers: this.courseForm.selectedUsers.filter(x => x.selected).map(x => ({
                        id: 0,
                        userId: x.user.id!
                    })),
                    users: this.courseForm.selectedUsers.map(x => x.user)
                })
            );
            //console.log(course);
            await this.loadCourses();
        } catch (error) {
            this.handleError(error);
            console.error('Ocurrió un error al actualizar el curso');
            console.error(error);
        }
    }

    public async deleteCourse(id: number) {
        try {
            await lastValueFrom(
                this.courseService.deleteCourse(id)
            );
            await this.loadCourses();
        } catch (error) {
            this.handleError(error);
            console.error('Ocurrió un error al eliminar el curso');
            console.error(error);
        }
    }

    private async loadCourses() {
        try {
            this.courseRows = await lastValueFrom(this.courseService.getCourse());
        } catch (error) {
            this.handleError(error);
            console.error('Ocurrió un error al obtener los cursos');
            console.error(error);
        }
    }

    private async loadUsers() {
        try {
            const users = await lastValueFrom(this.userService.getUsers());
            this.userRows = users;
            this.courseForm.users = [];

            for (const user of this.userRows) {
                this.courseForm.selectedUsers.push({
                    user,
                    selected: false
                });
            }
        } catch (error) {
            this.handleError(error);
            console.error('Ocurrió un error al obtener los usuarios');
            console.error(error);
        }
    }

    public openFormModal(course: Course): void {
        if (course) {
          this.courseForm = {
            id: course.id ?? 0,
            name: course.name ?? '',
            courseUsers: course.courseUsers ?? [],
            users: this.userRows ?? [],
            selectedUsers: this.courseForm.selectedUsers.map(x => ({ ...x, selected: false }))
          };

          this.courseForm.selectedUsers = this.courseForm.selectedUsers.map(user => {
            const foundUser = this.courseForm.courseUsers.find(u => u.userId === user.user.id);
            return { user: foundUser ?? user.user, selected: foundUser ? true : false };
          });
        }
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

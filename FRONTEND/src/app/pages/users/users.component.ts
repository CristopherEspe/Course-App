import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';

interface UserTableItem {
    user: any;
}

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
    public userRows: UserTableItem[] = [];
    public showFormModal = false;
    public users: User[] = [];
    public userForm = {
        id: 0,
        name: '',
        email: '',
        password: '',
    };

    message: string | null = null;

    constructor(private userService: UserService, private keycloakService: KeycloakService) { }

    ngOnInit(): void {
        this.loadUsers();

        try {
            this.userService.getUsers().subscribe((users: User[]) => {
                this.users = users;
            });
        } catch (error) {
			this.handleError(error);
            console.error('Ocurrió un error al obtener los usuarios');
            console.error(error);
        }
    }

    public isAdmin() {
        return this.keycloakService.getUserRoles().includes('admin');
    }

    public async createUser() {
        try {
            const user = await lastValueFrom(
                this.userService.createUser(this.userForm)
            );
            this.userRows.push({ user });
            await this.loadUsers();
        } catch (error) {
			this.handleError(error);
            console.error('Ocurrió un error al crear el usuario');
            console.error(error);
        }
    }

    public async updateUser() {
        try {
            const user = await lastValueFrom(
                this.userService.updateUser(this.userForm)
            );
            const index = this.userRows.findIndex((row) => row.user.id === user.id);
            this.userRows[index] = { user };
            await this.loadUsers();
        } catch (error) {
			this.handleError(error);
            console.error('Ocurrió un error al actualizar el usuario');
            console.error(error);
        }
    }

    public async deleteUser(id: number) {
        try {
            await lastValueFrom(this.userService.deleteUser(id));
            this.userRows = this.userRows.filter((row) => row.user.id !== id);
            await this.loadUsers();
        } catch (error) {
			this.handleError(error);
            console.error('Ocurrió un error al eliminar el usuario');
            console.error(error);
        }
    }

    private async loadUsers() {
        try {
            const users = await lastValueFrom(this.userService.getUsers());
            this.userRows = users.map((user: User) => ({ user }));
        } catch (error) {
            this.handleError(error);
            console.error('Ocurrió un error al obtener los usuarios');
            console.error(error);
        }
    }

    public openFormModal(user: User) {
        if (user) {
            this.userForm = {
                id: user.id ?? 0,
                name: user.name ?? '',
                email: user.email ?? '',
                password: user.password ?? '',
            };
        } else {
            this.userForm = {
                id: 0,
                name: '',
                email: '',
                password: '',
            };
        }
        this.showFormModal = true;
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

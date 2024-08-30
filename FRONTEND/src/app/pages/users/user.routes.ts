import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Users',
        loadComponent: async () => (await import('./users.component')).UsersComponent,
    },
]

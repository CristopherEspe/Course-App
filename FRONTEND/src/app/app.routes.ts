import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'users',
        loadChildren: async () => (await import('./pages/users/user.routes')).routes,
    },
    {
        path: 'courses',
        loadChildren: async () => (await import('./pages/courses/course.routes')).routes,
    },
    {
        path: 'enrollment',
        loadChildren: async () => (await import('./pages/enrollment/enrollment.route')).routes,
    }
];

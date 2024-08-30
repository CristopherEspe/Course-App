import { Route } from "@angular/router";

export const routes: Route[] = [
    {
        path: '',
        title: 'Users',
        loadComponent: async () => (await import('./courses.component')).CoursesComponent,
    },
]
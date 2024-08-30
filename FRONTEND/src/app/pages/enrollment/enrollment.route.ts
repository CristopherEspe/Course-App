import { Route } from "@angular/router";

export const routes: Route[] = [
    {
        path: '',
        title: 'Enrollment',
        loadComponent: async () => (await import('./enrollment.component')).EnrollmentComponent,
    },
]
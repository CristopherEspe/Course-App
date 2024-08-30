import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SharedModule } from '../../components/shared/shared.module';
import { KeycloakService } from 'keycloak-angular';
import { Key } from 'readline';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterModule, SharedModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

    public routes: any[] = [
        {
            title: 'Usuarios',
            icon: 'users',
            link: ['/users'],
        },
        {
            title: 'Cursos',
            icon: 'book',
            link: ['/courses'],
        },
        {
            title: 'Matrícula',
            icon: 'user-plus',
            link: ['/enrollment'],
        },
    ];

    public loggedIn: boolean = false;
    public profile: Keycloak.KeycloakProfile | null = null;

    constructor(private router: Router, private keycloakService: KeycloakService) {
        this.router = router;
    }

    async ngOnInit() {
      this.loggedIn = this.keycloakService.isLoggedIn();
      this.profile = await this.keycloakService.loadUserProfile();
    }

    logout() {
        this.keycloakService.logout();
    }
}

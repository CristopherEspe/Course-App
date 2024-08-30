import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { environment } from './enviroments/enviroment';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
          url: environment.keycloakUrl,
          realm: environment.keycloakRealm,
          clientId: environment.keycloakClientId
      },
      initOptions: {
          flow: 'standard',
          onLoad: 'login-required',
          scope: 'openid profile email',
          silentCheckSsoRedirectUri: '/assets/silent-check-sso.html'
      },
      loadUserProfileAtStartUp: true,
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      shouldAddToken: (request: any) => {
          return true;
      }
  });
}

export const appConfig: ApplicationConfig = {
    providers: [
      provideHttpClient(withInterceptorsFromDi()),
      {
          provide: APP_INITIALIZER,
          useFactory: initializeKeycloak,
          deps: [KeycloakService],
          multi: true
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: KeycloakBearerInterceptor,
          multi: true,
          deps: [KeycloakService]
      },
      KeycloakService,
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideClientHydration()
    ],
};

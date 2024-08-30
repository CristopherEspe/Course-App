export const environment = {
  apiUrlUsers: '${USERS_SERVICE_ENDPOINT:-http://localhost:8001}',
  apiUrlCourses: '${COURSES_SERVICE_ENDPOINT:-http://localhost:8002}',
  keycloakRealm: '${KEYCLOAK_REALM:-CoursesApp}',
  keycloakClientId: '${KEYCLOAK_CLIENT_ID:-coursesapp}',
  keycloakUrl: '${KEYCLOAK_URL:-http://localhost:8080}',
};

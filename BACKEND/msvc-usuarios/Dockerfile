FROM openjdk:17.0.2

WORKDIR /app

COPY ./target/users-app-0.0.1-SNAPSHOT.jar /app

EXPOSE 8001
ENV spring.datasource.url=jdbc:mysql://database-mysql:3306/msvc-users
ENV feign.url.msvc-cursos=http://msvc-cursos:8002

ENTRYPOINT ["java", "-jar", "users-app-0.0.1-SNAPSHOT.jar"]
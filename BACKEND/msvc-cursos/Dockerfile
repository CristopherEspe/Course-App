FROM openjdk:17.0.2

WORKDIR /app

COPY ./target/msvc-cursos-0.0.1-SNAPSHOT.jar /app

EXPOSE 8002
ENV spring.datasource.url=jdbc:postgresql://database-postgres:5432/appdb
ENV feign.url.msvc-users=http://msvc-users:8001

ENTRYPOINT ["java", "-jar", "msvc-cursos-0.0.1-SNAPSHOT.jar"]
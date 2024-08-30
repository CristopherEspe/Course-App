package com.example.msvc.cursos.services;

import com.example.msvc.cursos.models.User;
import com.example.msvc.cursos.models.entity.Course;

import java.util.List;
import java.util.Optional;

public interface CourseService {

    List<Course> list();

    Optional<Course> byId(Long id);

    Course save(Course course);

    void delete(Long id);

    Optional<User> addUser(User user, Long courseId);

    Optional<User> createUser(User user, Long courseId);

    Optional<User> deleteUser(Long id, Long courseId);

    List<Course> findCoursesByUserId(Long userId);
}

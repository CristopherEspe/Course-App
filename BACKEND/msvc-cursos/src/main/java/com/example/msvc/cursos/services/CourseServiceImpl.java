package com.example.msvc.cursos.services;

import com.example.msvc.cursos.clients.UserClientRest;
import com.example.msvc.cursos.models.User;
import com.example.msvc.cursos.models.entity.Course;
import com.example.msvc.cursos.models.entity.CourseUser;
import com.example.msvc.cursos.repositories.CourseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserClientRest userClientRest;

    @Override
    @Transactional(readOnly = true)
    public List<Course> list(){
        return (List<Course>) courseRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Course> byId(Long id){
        return courseRepository.findById(id);
    }

    @Override
    @Transactional
    public Course save(Course course){
        return courseRepository.save(course);
    }

    @Override
    @Transactional
    public void delete(Long id){
        courseRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Optional<User> addUser(User user, Long courseId) {
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isPresent()) {
            Course course = optionalCourse.get();
            User userMsvc = userClientRest.detail(user.getId());
            CourseUser courseUser = new CourseUser();
            courseUser.setUserId(userMsvc.getId());
            course.addCourseUser(courseUser);
            courseRepository.save(course);
            return Optional.of(userMsvc);
        }
        return Optional.empty();
    }

    @Override
    public Optional<User> createUser(User user, Long courseId) {
        Optional<Course> o = courseRepository.findById(courseId);
        if(o.isPresent()) {
            Course course = o.get();

            if(course.getCourseUsers().size() >= 25) {
                throw new RuntimeException("The course has reached the maximum number of students.");
            }

            boolean userExists = course.getCourseUsers().stream()
                    .anyMatch(cu -> cu.getUserId().equals(user.getId()));
            if(userExists) {
                throw new RuntimeException("The user is already enrolled in this course.");
            }

            User userMicro = userClientRest.create(user);

            CourseUser courseUser = new CourseUser();
            courseUser.setUserId(userMicro.getId());

            course.addCourseUser(courseUser);
            courseRepository.save(course);

            return Optional.of(userMicro);
        }
        return Optional.empty();
    }

    @Override
    public Optional<User> deleteUser(Long id, Long courseId) {
        Optional<Course> o = courseRepository.findById(courseId);
        if(o.isPresent()) {
            Course course = o.get();

            User userMicro = userClientRest.detail(id);

            course.getCourseUsers().removeIf(cu -> cu.getUserId().equals(id));
            courseRepository.save(course);

            return Optional.of(userMicro);
        }
        return Optional.empty();
    }

    @Override
    public List<Course> findCoursesByUserId(Long userId) {
        List<Course> courses = courseRepository.findCoursesByUserId(userId);
        return courses.stream().distinct().collect(Collectors.toList());
    }
}


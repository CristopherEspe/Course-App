package com.example.msvc.cursos.controllers;

import com.example.msvc.cursos.models.User;
import com.example.msvc.cursos.models.entity.Course;
import com.example.msvc.cursos.services.CourseService;

import feign.FeignException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<Course> list(){
        return courseService.list();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> byId(@PathVariable Long id){
        Optional<Course> course = courseService.byId(id);
        if(course.isPresent()){
            return ResponseEntity.ok(course.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course createdCourse = courseService.save(course);
        return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> update(@Valid @RequestBody Course course) {
        Optional<Course> courseOptional = courseService.byId(course.getId());
        if(courseOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.CREATED).body(courseService.save(course));
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Course> courseOptional = courseService.byId(id);
        if(courseOptional.isPresent()){
            courseService.delete(id);
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/assign-user/{userId}")
    public ResponseEntity<?> assignUser(@PathVariable Long id, @PathVariable Long userId) {
        Optional<User> o;
        try {
            o = courseService.addUser(new User(userId), id);
        } catch (FeignException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Error assigning user: " + e.getLocalizedMessage()));
        }

        if (o.isPresent()) {
            return ResponseEntity.ok(o.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/unassign-user/{userId}")
    public ResponseEntity<?> unassignUser(@PathVariable Long id, @PathVariable Long userId) {
        Optional<User> o;
        try {
            o = courseService.deleteUser(userId, id);
        } catch (FeignException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("message", "Error unassigning user: " + e.getLocalizedMessage()));
        }

        if (o.isPresent()) {
            return ResponseEntity.ok(o.get());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}")
    public List<Course> getCoursesByUserId(@PathVariable Long userId) {
        return courseService.findCoursesByUserId(userId);
    }

}

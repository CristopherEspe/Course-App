package com.example.msvc.cursos.repositories;

import com.example.msvc.cursos.models.entity.Course;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends CrudRepository<Course, Long> {
    @Query("SELECT c FROM Course c JOIN c.courseUsers cu WHERE cu.userId = :userId")
    List<Course> findCoursesByUserId(@Param("userId") Long userId);
}

package ec.edu.espe.usersapp.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "msvc-cursos", url = "http://localhost:8002")
public interface CourseClientRest {

    @GetMapping("/courses/user/{userId}")
    List<Object> getCoursesByUserId(@PathVariable("userId") Long userId);
}
package ec.edu.espe.usersapp.services;

import ec.edu.espe.usersapp.clients.CourseClientRest;
import ec.edu.espe.usersapp.entity.User;
import ec.edu.espe.usersapp.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private CourseClientRest courseClient;

    @Override
    public List<User> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<User> getById(Long id) {
        return repository.findById(id);
    }

    @Override
    public User save(User usuario) {
        return repository.save(usuario);
    }

    @Override
    public void delete(Long id) {
        List<Object> courses = courseClient.getCoursesByUserId(id);
        if (!courses.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El usuario está matriculado en uno o más cursos y no puede ser eliminado.");
        }

        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "El id del usuario no existe o es incorrecto.");
        }
    }

    @Override
    public void update(User usuario) {
        if (repository.existsById(usuario.getId())) {
            repository.save(usuario);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "El id del usuario no existe o es incorrecto.");
        }
    }
}

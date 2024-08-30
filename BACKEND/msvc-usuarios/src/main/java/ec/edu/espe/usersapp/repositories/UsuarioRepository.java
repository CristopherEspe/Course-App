package ec.edu.espe.usersapp.repositories;

import ec.edu.espe.usersapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<User, Long> {}

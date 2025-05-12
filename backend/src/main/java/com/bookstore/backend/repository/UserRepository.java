package com.bookstore.backend.repository;

import com.bookstore.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long > {
    boolean existsByUsername(String username);
    Optional<User> findByUsernameAndPassword(String username, String password);
}





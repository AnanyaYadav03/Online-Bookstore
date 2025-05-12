package com.bookstore.backend.controller;

import com.bookstore.backend.model.User;
import com.bookstore.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
//@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepo;  //Injects the UserRepository to interact with the database.

    @GetMapping("/test")
    public String test() {
        return "Backend is working!";
    }

    @PostMapping("/register")       //to register a user
    public ResponseEntity<?> register(@RequestBody User user) {

        if (userRepo.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        User savedUser = (User) userRepo.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        Optional<User> authenticatedUser = userRepo.findByUsernameAndPassword(user.getUsername(), user.getPassword());

        if (authenticatedUser.isPresent()) {
            return ResponseEntity.ok(authenticatedUser.get());
        }

        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}

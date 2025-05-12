package com.bookstore.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity //it maps to a database table
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String firstname;
    private String lastname;
    private String address;
    private String phone;

    @Column(unique = true, nullable = false)
    private String mailid;

    /**
     * User type:
     * 1 = Admin
     * 2 = Normal user
     */
    private int usertype;


}

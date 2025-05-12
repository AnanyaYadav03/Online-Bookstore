//maps to db table
package com.bookstore.backend.model;

import jakarta.persistence.*;  //JPA annotations to map Java objects to database tables.
import lombok.*;   //Lombok auto-generates boilerplate code like getters, setters, constructors.
import lombok.Getter;
import lombok.Setter;

@Entity   //JPA entity → it maps to a table in the database

@Data //Lombok generates getters, setters, toString, equals, and hashCode.

@NoArgsConstructor //creates a no-argument constructor.

@AllArgsConstructor // creates a constructor with all fields.
@Table(name = "books")   //Maps this entity to the books table in the database

@Getter
@Setter

public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  //auto-generates ID using the DB’s identity mechanism.

    private int id;
    private String title;
    private String author;
    private double price;
    private int quantity;
    private String description;
}
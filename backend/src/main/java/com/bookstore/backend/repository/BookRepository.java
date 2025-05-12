//gives ready-made DB methods (no need to write SQL).

package com.bookstore.backend.repository;

import com.bookstore.backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
    // Defines a repository interface for Book.
    //
    //Extends JpaRepository<Book, Integer> → provides CRUD operations automatically.
    //
    //Book → entity type.
    //
    //Integer → primary key type.
}

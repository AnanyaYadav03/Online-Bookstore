//exposes REST API endpoints (GET, POST, PUT, DELETE) for the frontend.

package com.bookstore.backend.controller;

import com.bookstore.backend.model.Book;
import com.bookstore.backend.repository.BookRepository;   //data layer
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;  //wraps http responses
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/books")
//@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private BookRepository bookRepo;  //Injects the BookRepository dependency to interact with the database.

    @GetMapping
    public ResponseEntity<?> getAllBooks() {
        return ResponseEntity.ok(bookRepo.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable int id) {
        return bookRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        return ResponseEntity.ok(bookRepo.save(book));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable int id, @RequestBody Book updatedBook) {
        return bookRepo.findById(id)
                .map(book -> {
                    book.setTitle(updatedBook.getTitle());
                    book.setAuthor(updatedBook.getAuthor());
                    book.setPrice(updatedBook.getPrice());
                    book.setQuantity(updatedBook.getQuantity());
                    return ResponseEntity.ok(bookRepo.save(book));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable int id) {
        if (!bookRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        bookRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

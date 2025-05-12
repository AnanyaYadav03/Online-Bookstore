package com.bookstore.backend.controller;

import com.bookstore.backend.dto.OrderItem;
import com.bookstore.backend.dto.OrderRequest;
import com.bookstore.backend.model.Book;
import com.bookstore.backend.model.Order;
import com.bookstore.backend.repository.BookRepository;
import com.bookstore.backend.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")

public class OrderController {

    @Autowired  //Injects the order and book repositories.
    private OrderRepository orderRepo;

    @Autowired
    private BookRepository bookRepo;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    @PostMapping
    @Transactional  //ensures all DB changes are committed or rolled back together
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest orderRequest) {

        String username = orderRequest.getUsername();
        if (username == null || username.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username is required");
        }

        List<OrderItem> items = orderRequest.getItems();
        if (items == null || items.isEmpty()) {
            return ResponseEntity.badRequest().body("Order items cannot be empty");
        }

        List<Order> savedOrders = new ArrayList<>();  //Prepares a list to store saved orders

        for (OrderItem item : items) {
            Optional<Book> bookOpt = bookRepo.findById(item.getBookId());
            if (bookOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Book not found: id=" + item.getBookId());
            }

            Book book = bookOpt.get();

            if (item.getQuantity() <= 0) {
                return ResponseEntity.badRequest().body("Invalid quantity for book: " + book.getTitle());
            }

            if (book.getQuantity() < item.getQuantity()) {
                return ResponseEntity.badRequest().body("Not enough quantity for book: " + book.getTitle());
            }

            // Decrease stock
            book.setQuantity(book.getQuantity() - item.getQuantity());
            bookRepo.save(book);

            // Save order record
            Order order = new Order();
            order.setUsername(username);
            order.setBookId(item.getBookId());
            order.setQuantity(item.getQuantity());
            savedOrders.add(orderRepo.save(order));
        }

        return ResponseEntity.ok(savedOrders);
    }
}

package com.bookstore.backend.repository;

import com.bookstore.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
//Defines the repository interface for CRUD operations on Order. No extra methods are needed because JpaRepository provides basic ones.

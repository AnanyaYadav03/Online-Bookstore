package com.bookstore.backend.dto;

public class OrderItem {

    private int bookId;
    private int quantity;

    public OrderItem() {}  //default constructor

    public OrderItem(int bookId, int quantity) {
        this.bookId = bookId;
        this.quantity = quantity;
    }
//getter and setters
    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}

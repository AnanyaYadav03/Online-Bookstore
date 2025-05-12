package com.bookstore.backend.dto;

import java.util.List;

public class OrderRequest {

    private String username;
    private List<OrderItem> items;

    public OrderRequest() {}

    public OrderRequest(String username, List<OrderItem> items) {
        this.username = username;
        this.items = items;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}

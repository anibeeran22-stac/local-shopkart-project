package com.shopkart.dto;

import java.util.List;

public class OrderRequest {

    private Long userId;

    private String paymentMethod;

    private String address;

    private String phone;

    private List<OrderItemRequest> items;

    public OrderRequest() {
    }

    public OrderRequest(
            Long userId,
            String paymentMethod,
            String address,
            String phone,
            List<OrderItemRequest> items) {

        this.userId = userId;
        this.paymentMethod = paymentMethod;
        this.address = address;
        this.phone = phone;
        this.items = items;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<OrderItemRequest> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }
}
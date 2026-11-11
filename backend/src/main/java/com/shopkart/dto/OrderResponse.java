package com.shopkart.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {

    private Long orderId;

    private Long userId;

    private Double totalAmount;

    private String status;

    private String paymentMethod;

    private String address;

    private String phone;

    private LocalDateTime createdAt;

    private List<OrderItemResponse> items;
    
    private String customerName;
    private String customerEmail;

    public OrderResponse() {
    }

    public OrderResponse(
            Long orderId,
            Long userId,
            Double totalAmount,
            String status,
            String paymentMethod,
            String address,
            String phone,
            LocalDateTime createdAt,
            List<OrderItemResponse> items,
            String customerName,
    		String customerEmail)
    
    		{

        this.orderId = orderId;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.address = address;
        this.phone = phone;
        this.createdAt = createdAt;
        this.items = items;
        this.customerName=customerName;
        this.customerEmail=customerEmail;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<OrderItemResponse> getItems() {
        return items;
    }

    public void setItems(List<OrderItemResponse> items) {
        this.items = items;
    }
    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }
}